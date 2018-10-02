const path = require('path');
const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');

const AWS = require('aws-sdk');
const fs = require('fs');
const fileType = require('file-type');
const bluebird = require('bluebird');
const multiparty = require('multiparty');
const { BUCKET_ID, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = require('../secrets');
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

const uploadFile = (buffer, name, type) => {
	const params = {
		ACL: 'public-read',
		Body: buffer,
		Bucket: BUCKET_ID,
		ContentType: type.mime,
		Key: `${name}.${type.ext}`
	};
	var bucket = new AWS.S3({ params: { Bucket: BUCKET_ID } });
	return bucket.putObject(params).promise();
	//return s3.upload(params).promise();
};

app.get('/compare-images', (request, response) => {
	try {
		const params = {
			SimilarityThreshold: 90,
			SourceImage: {
				S3Object: {
					Bucket: BUCKET_ID,
					Name: '1538283498846.jpg'
				}
			},
			TargetImage: {
				S3Object: {
					Bucket: BUCKET_ID,
					Name: '1538283302621.jpg'
				}
			}
		};
		// var bucket = new AWS.S3({ params: { Bucket: BUCKET_ID } });
		rek.compareFaces(params, function(err, data) {
			console.log('inside compare', data);
			if (err) {
				console.log(err);
			} else {
				// an error occurred
				console.log('from compare face method', data);
			}
		});
	} catch (err) {
		return response.status(400).send(err);
	}
});
//Post route to upload file
app.post('/test-upload', (request, response) => {
	const form = new multiparty.Form();
	form.parse(request, async (error, fields, files) => {
		if (error) throw new Error(error);
		try {
			const path1 = files.file[0].path;
			const buffer = fs.readFileSync(path1);
			const type = fileType(buffer);
			const timestamp = Date.now().toString();
			const fileName = `${timestamp}`;
			this.filetoDb = fileName.toString() + '.jpg';
			response.json(fileName);
			const data = await uploadFile(buffer, fileName, type);

			return response.status(200).send(response);
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
