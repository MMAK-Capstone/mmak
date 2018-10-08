const router = require('express').Router();
const {User, Game, Review} = require('../db/models');

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


  router.get('/:gameId/reviews', async (req, res, next) => {
    try {
      const gameId = Number(req.params.gameId)
      const reviewsByGame = await Review.findAll({
        where: {
          gameId: gameId
        },
        include: [{model: User}]
      })
      res.json(reviewsByGame)
    } catch (error) {
      next(error)
    }
  })

  router.post('/:gameId/reviews', async (req, res, next) => {
    let gameForReview = await Game.findById(req.params.gameId)
    try {
      if (!gameForReview) {
        res.sendStatus(404)
      } else {
        console.log(`incoming review in GAME ROUTE`, req.body)
        let incomingReview = req.body
        let postedReview = await Review.create(incomingReview)
        res.json(postedReview)
      }
    } catch (error) {
      next(error)
    }
  })

module.exports = router;