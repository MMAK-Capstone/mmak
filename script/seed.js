'use strict';

const db = require('../server/db');
const {Game} = require('../server/db/models');

async function seed() {
	await db.sync({ force: true });
	console.log('db synced!');

	const games = await Promise.all([
    Game.create({
      name: 'Science Fighter',
      description: 'Help the scientist defeat the environmental injustices! Complete level 3 in order to win!',
      gif: '/pictures/mathGame.png',
      score: 0,
      gameUrl: 'https://test-game-46120.firebaseapp.com/',
      category: 'edu'
    }),
		Game.create({
			name: 'Compare Garden',
			description: 'Review inequalities in the compare garden. Earning 100 points will make you a winner!',
			gif: '/gamePics/compare.gif',
			score: 0,
			gameUrl: 'https://island-runner-9bd31.firebaseapp.com/',
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
		})
	]);
	console.log(`seeded ${games.length} games`);
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
