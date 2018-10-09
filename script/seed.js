'use strict';

const db = require('../server/db');
const { User, Game, Question } = require('../server/db/models');

async function seed() {
	await db.sync({ force: true });
	console.log('db synced!');

	const games = await Promise.all([
		Game.create({
			name: 'Math Masters',
			description: 'Are the math facts and riddles true or false? Earn 100 points to win!',
			gif: '/gamePics/math-masters.gif',
			score: 0,
			gameUrl: 'https://mmak-math-masters.firebaseapp.com/',
			category: 'edu'
		}),
		Game.create({
			name: 'Island Runner',
			description:
				'How long can you run through the island while dodging vines and branches? Play this game to find out!',
			gif: '/gamePics/island-runner.gif',
			score: 0,
			gameUrl: 'https://island-runner-9bd31.firebaseapp.com/',
			category: 'fun'
		}),
		Game.create({
			name: 'Science Fighter',
			description: 'Help the scientist defeat the environmental injustices! Complete level 3 in order to win!',
			gif: '/pictures/mathGame.png',
			score: 0,
			gameUrl: 'https://test-game-46120.firebaseapp.com/',
			category: 'edu'
		})
	]);
	console.log(`seeded ${games.length} games`);
	console.log(`seeded successfully`);

	const questions = await Promise.all([
		Question.create({ level: 'medium', text: '456 is divisible by 2', answer: 'true', filter: 'math' }),
		Question.create({ level: 'easy', text: 'What is 2 +2?', answer: '4', filter: 'math' }),
		Question.create({
			level: 'hard',
			text: '456 is divisible by 10 without remainders',
			answer: 'false',
			filter: 'math'
		})
	]);

	console.log(`seeded ${questions.length} games`);
	console.log(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
	console.log('seeding...');
	try {
		await seed();
	} catch (err) {
		console.error(err);
		process.exitCode = 1;
	} finally {
		console.log('closing db connection');
		await db.close();
		console.log('db connection closed');
	}
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
	runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
