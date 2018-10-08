const router = require('express').Router();
const User = require('../db/models/user');
const multiparty = require('multiparty');
// const { BUCKET_ID, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = require('../secrets');

module.exports = router;

router.post('/login', async (req, res, next) => {
	try {
		const user = await User.findOne({ where: { username: req.body.username } });
		if (!user) {
			console.log('No such user found:', req.body.username);
			res.status(401).send('Wrong username and/or password');
		} else if (!user.correctPassword(req.body.password)) {
			console.log('Incorrect password for user:', req.body.username);
			res.status(401).send('Wrong username and/or password');
		} else {
			req.login(user, (err) => (err ? next(err) : res.json(user)));
		}
	} catch (err) {
		next(err);
	}
});

router.post('/facelogin', async (req, res, next) => {
	res = await req;
	console.log('<', req.body.file);
});
// const user = await User.findOne({ where: { username: req.body.username } });
// if (!user) {
// 	console.log('No such user found:', req.body.username);
// 	res.status(401).send('Wrong username and/or password');
// } else if (!user.correctPassword(req.body.password)) {
// 	console.log('Incorrect password for user:', req.body.username);
// 	res.status(401).send('Wrong username and/or password');
// } else {
// 	req.login(user, (err) => (err ? next(err) : res.json(user)));
// }

router.post('/signup', async (req, res, next) => {
	try {
		const user = await User.create({
			username: req.body.username,
			imageUrl: req.body.fileName,
			password: req.body.password
		});
		req.login(user, (err) => (err ? next(err) : res.json(user)));
	} catch (err) {
		if (err.name === 'SequelizeUniqueConstraintError') {
			res.status(401).send('User already exists');
		} else {
			next(err);
		}
	}
});

router.post('/logout', (req, res) => {
	req.logout();
	req.session.destroy();
	res.redirect('/');
});

router.get('/me', (req, res) => {
	res.json(req.user);
});

router.use('/google', require('./google'));
