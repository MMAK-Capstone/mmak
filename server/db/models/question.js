const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Question = db.define('question', {
  level:{
    type: Sequelize.ENUM,
    values: ['easy', 'medium', 'hard'],
    allowNull: false
  },
  text: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  answer: {
    type: Sequelize.STRING,
    allowNull: false
  },
  filter: {
    type: Sequelize.STRING
  }
})

module.exports = Question
