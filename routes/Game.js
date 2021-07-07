const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const db = require('../models')

router.use(bodyParser.urlencoded({ extended: false }))

router.post('/createFavorite', async (req, res) => {
  try {
    const title = req.body.title
    const storeID = req.body.storeID
    const gameID = req.body.gameID
    const dealID = req.body.dealID
    const salePrice = req.body.salePrice
    const normalPrice = req.body.normalPrice
    const savings = req.body.savings
    const isOnSale = req.body.isOnSale
    const metacriticLink = req.body.metacriticLink
    const metacriticScore = req.body.metacriticScore
    const steamRatingText = req.body.steamRatingText
    const steamRatingPercent = req.body.steamRatingPercent
    const steamRatingCount = req.body.steamRatingCount
    const steamAppID = req.body.steamAppID
    const releaseDate = req.body.releaseDate
    const lastChange = req.body.lastChange
    const dealRating = req.body.dealRating
    const thumb = req.body.thumb
    const userID = req.body.userID
    const reviews = req.body.steamRatingCount

    const steamReviewChecker = (reviews) => {
      if (reviews < 1) {
        return 'false'
      } else {
        return 'true'
      }
    }
    const steamCheckerBool = steamReviewChecker(reviews)

    const score = req.body.metacriticScore
    const metacriticScoreColor = (score) => {
      if (score > 89) {
        return 'lightgreen'
      } else if (score < 90 && score > 75) {
        return 'green'
      } else if (score < 75 && score > 51) {
        return 'yellow'
      } else {
        return 'red'
      }
    }
    const scoreColor = metacriticScoreColor(score)

    const newGame = await db.games.create({
      title: title,
      metacriticLink: metacriticLink,
      dealID: dealID,
      storeID: storeID,
      gameID: gameID,
      salePrice: parseFloat(salePrice),
      normalPrice: parseFloat(normalPrice),
      isOnSale: isOnSale,
      savings: parseFloat(savings).toFixed(2),
      metacriticScore: metacriticScore,
      steamRatingText: steamRatingText,
      steamRatingPercent: steamRatingPercent,
      steamRatingCount: steamRatingCount,
      steamAppID: steamAppID,
      releaseDate: releaseDate,
      lastChange: lastChange,
      dealRating: dealRating,
      thumb: thumb,
      userID: userID,
      steamCheckerBool: steamCheckerBool,
      scoreColor: scoreColor
    })
    console.log(newGame)

    res.status(200).json({ message: 'Title Saved to Favorites!', newGame })
  } catch (e) {
    res.status(500).json({ message: 'An error has occured', error: e })
  }
})

router.post('/viewFavorites', (req, res) => {
  const userID = req.body.userID

  db.games
    .findAll({
      where: {
        userID: userID
      }
    })
    .then((games) => {
      res.status(200).json(games)
    })
    .catch((err) => {
      console.log(err)
    })
})

router.post('/deleteFavorite', (req, res) => {
  const id = req.body.id

  db.games
    .destroy({
      where: {
        id: id
      }
    })
    .then(() => {
      res.status(200).json({ message: 'Game removed from favorites' })
    })
    .catch((err) => console.error(err))
})

module.exports = router
