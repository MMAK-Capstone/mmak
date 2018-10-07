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
    const requestedGameId = Number(req.params.gameId)
    try {
      const  singleGame= await Game.findAll({
        where: {
          id: requestedGameId
        },
        include: [{ all: true }]
      })
      res.json(singleGame)
    } catch (error) {
      next(error)
    }
  })

module.exports = router;