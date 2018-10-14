'use strict'

const router = require('express').Router();
const {Game} = require('../db/models');

router.get('/:categoryName', async (req, res, next) => {
  try {
    const category = await Game.findAll({where: {
      category: req.params.categoryName,
      }});
    res.json(category);
  } catch (err) {
    console.log('error with express route to get category');
    next(err);
  }
});


module.exports = router;

