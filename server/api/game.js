const router = require('express').Router();
const {Game} = require('../db/models');

router.get('/', async (req, res, next) => {
    try {
        const game = await Game.findAll();
        res.json(game);
    }catch(err){
        next(err);
    }
});

router.get('/:gameId', async (req, res, next) => {
    const reqGameId = Number(req.params.gameId)
    console.log(`here is the reqGameId`, reqGameId);
    try {
      const  singleGame= await Game.findAll({
        where: {
          id: reqGameId
        },
        include: [{ all: true }]
      })
      res.json(singleGame)
    } catch (error) {
      next(error)
    }
  })

module.exports = router;