const User = require('./user');
const Game = require('./game');
const Question = require('./question');
const Review = require('./review');

Review.belongsTo(User);
Review.belongsTo(Game);
User.hasMany(Review);
Game.hasMany(Review);
User.hasMany(Game);
Game.belongsTo(User);
Question.belongsToMany(Game, {through: 'questionForGame'});
Game.belongsToMany(Question, {through: 'questionForGame'});

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

module.exports = {
  User,
  Game,
  Question,
  Review,
}
