const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Game = db.define('game', {
  name:{
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  category:{
    type:   Sequelize.ENUM,
    values: ['edu', 'fun'],
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  gif: {
    type: Sequelize.STRING,
  },
  score: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
})

module.exports = Game
