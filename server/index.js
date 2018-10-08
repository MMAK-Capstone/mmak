const { User } = require('./db/models');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const session = require('express-session');
const passport = require('passport');
const AWS = require('aws-sdk');
const fs = require('fs');
const bluebird = require('bluebird');
const multiparty = require('multiparty');
const { IMAGE_COLLECTION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = require('../secrets');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./db');
const sessionStore = new SequelizeStore({ db });
const PORT = process.env.PORT || 8080;
const app = express();
const socketio = require('socket.io');

module.exports = app;

AWS.config.update({
	accessKeyId: AWS_ACCESS_KEY_ID,
	secretAccessKey: AWS_SECRET_ACCESS_KEY,
	region: 'us-east-2'
});
AWS.config.setPromisesDependency(bluebird);

// create S3 instance
const s3 = new AWS.S3();
const rek = new AWS.Rekognition();

//Post route to upload file
app.post('/lookup-user', async (request, response) => {
	const form = new multiparty.Form();
	form.parse(request, async (error, fields, files) => {
		if (error) throw new Error(error);
		try {
			const path1 = files.file[0].path;
			const buffer = fs.readFileSync(path1);

			await lookUpImage(buffer, response);
		} catch (err) {
			console.log('Got Error', err);
			return response.status(400).json(err);
		}
	});
});

async function createCollectionOnAWS() {
	let params = {
		CollectionId: IMAGE_COLLECTION
	};
	await rek.createCollection(params, function(err, data) {
		if (err)
			console.log(err, err.stack); // an error occurred
		else console.log(data); // successful response
	});
}

async function addImageToCollectionOnAWS(timestamp, image) {
	var params = {
		CollectionId: IMAGE_COLLECTION,
		ExternalImageId: timestamp,
		Image: { Bytes: image }
	};
	await rek.indexFaces(params, function(err, data) {
		if (err)
			console.log(err, err.stack); // an error occurred
		else console.log(data); // successful response
	});
}

async function listImagesFromCollectionAWS() {
	var params = {
		CollectionId: IMAGE_COLLECTION
	};
	console.log('listImagesFromCollectionAWS', params);
	await rek.listFaces(params, function(err, data) {
		if (err)
			console.log('listImagesFromCollectionAWS', err, err.stack); // an error occurred
		else console.log('listImagesFromCollectionAWS', data); // successful response
	});
}

async function deleteUnwantedCollectionAWS(allUsersImageUrls) {
	console.log('Registered User Images', allUsersImageUrls);
	var params = {
		CollectionId: IMAGE_COLLECTION
	};
	console.log('deleteUnwantedCollectionAWS', params);
	await rek.listFaces(params, function(err, data) {
		if (err) console.log('deleteUnwantedCollectionAWS', err, err.stack);
		else {
			console.log('deleteUnwantedCollectionAWS', data);
			var faceIds = data.Faces
				.filter((item) => !allUsersImageUrls.includes(item.ExternalImageId))
				.map((item) => item.FaceId);

			params.FaceIds = faceIds;
			if (faceIds.length < 1) {
				console.log('No Unwanted images to delete', faceIds);
				return;
			}
			rek.deleteFaces(params, function(err, data) {
				if (err)
					console.log('deleteUnwantedCollectionAWS', err, err.stack); // an error occurred
				else console.log('deleteUnwantedCollectionAWS', data); // successful response
			});
		} // successful response
	});
}

app.post('/list-images', async (request, response) => {
	try {
		var data = await listImagesFromCollectionAWS();
	} catch (err) {
		return response.status(400).send(err);
	}
});

app.post('/create-collection-of-user', async (request, response) => {
	try {
		data = await createCollectionOnAWS();
		const allUsersPromise = await User.findAll({
			attributes: [ 'id', 'username', 'imageUrl' ]
		});

		let allUsersData = allUsersPromise;
		let allUsersImageUrls = allUsersData
			.filter((user) => {
				let userData = user.dataValues;
				return userData.imageUrl !== null && userData.imageUrl !== '';
			})
			.map((user) => user.dataValues.imageUrl);
		console.log('Registered User Images', allUsersImageUrls);
		await deleteUnwantedCollectionAWS(allUsersImageUrls);
	} catch (err) {
		return response.status(400).send(err);
	}
});

async function lookUpImage(image, response) {
	var params = {
		CollectionId: IMAGE_COLLECTION,
		FaceMatchThreshold: 80,
		Image: {
			Bytes: image
		},
		MaxFaces: 1
	};
	var resultdata = await rek
		.searchFacesByImage(params, (err, data) => {
			if (err) {
				console.error('lookUpImage responding', err.message);
			}
		})
		.promise();
	console.log('lookUpImageSearchFaceResult', resultdata);
	if (resultdata.FaceMatches.length < 1) {
		if (response !== null) {
			console.log('lookUpImage responding', 'Face could not recognise');
			throw new Error('Face could not recognise');
		} else {
			return null;
		}
	}
	const userDetails = await User.findOne({
		where: {
			imageUrl: resultdata.FaceMatches[0].Face.ExternalImageId
		}
	});
	if (response !== null) {
		console.log('lookUpImage responding', resultdata.FaceMatches[0].Face);
		if (userDetails !== null) return response.send(userDetails);
		else throw new Error('User does not exist for Face ID.');
	} else {
		return userDetails;
	}
}

//Post route to upload file
app.post('/upload-signup-image', async (request, response) => {
	const form = new multiparty.Form();
	form.parse(request, async (error, fields, files) => {
		if (error) throw new Error(error.message);
		try {
			const path1 = files.file[0].path;
			const buffer = fs.readFileSync(path1);
			const timestamp = Date.now().toString();
			var userDetails = await lookUpImage(buffer, null);
			if (userDetails !== null && userDetails.dataValues !== null) {
				console.error('Face already exist', userDetails.dataValues);
				throw new Error('Face already exist ' + userDetails.dataValues);
			} else {
				var data = await addImageToCollectionOnAWS(timestamp, buffer);
				return response.json(timestamp);
			}
		} catch (err) {
			return response.status(400).send(err);
		}
	});
});

// This is a global Mocha hook, used for resource cleanup.
// Otherwise, Mocha v4+ never quits after tests.
if (process.env.NODE_ENV === 'test') {
	after('close the session store', () => sessionStore.stopExpiringSessions());
}

/**
 * In your development environment, you can keep all of your
 * app's secret API keys in a file called `secrets.js`, in your project
 * root. This file is included in the .gitignore - it will NOT be tracked
 * or show up on Github. On your production server, you can add these
 * keys as environment variables, so that they can still be read by the
 * Node process on process.env
 */
if (process.env.NODE_ENV !== 'production') require('../secrets');

// passport registration
passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
	try {
		const user = await db.models.user.findById(id);
		done(null, user);
	} catch (err) {
		done(err);
	}
});

const createApp = () => {
	// logging middleware
	app.use(morgan('dev'));

	// body parsing middleware
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	// compression middleware
	app.use(compression());

	// session middleware with passport
	app.use(
		session({
			secret: process.env.SESSION_SECRET || 'my best friend is Cody',
			store: sessionStore,
			resave: false,
			saveUninitialized: false
		})
	);
	app.use(passport.initialize());
	app.use(passport.session());

	// auth and api routes
	app.use('/auth', require('./auth'));
	app.use('/api', require('./api'));

	// static file-serving middleware
	app.use(express.static(path.join(__dirname, '..', 'public')));

	// any remaining requests with an extension (.js, .css, etc.) send 404
	app.use((req, res, next) => {
		if (path.extname(req.path).length) {
			const err = new Error('Not found');
			err.status = 404;
			next(err);
		} else {
			next();
		}
	});

	// sends index.html
	app.use('*', (req, res) => {
		res.sendFile(path.join(__dirname, '..', 'public/index.html'));
	});

	// error handling endware
	app.use((err, req, res, next) => {
		console.error(err);
		console.error(err.stack);
		res.status(err.status || 500).send(err.message || 'Internal server error.');
	});
};

const startListening = () => {
	// start listening (and create a 'server' object representing our server)
	const server = app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));

	// set up our socket control center
	const io = socketio(server);
	require('./socket')(io);
};

const syncDb = () => db.sync();

async function bootApp() {
	await sessionStore.sync();
	await syncDb();
	await createApp();
	await startListening();
}
// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec
if (require.main === module) {
	bootApp();
} else {
	createApp();
}
