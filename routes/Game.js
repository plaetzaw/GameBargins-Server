const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const axios = require('axios')
// const CircularJSON = require('circular-json')
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

    const test = {
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
    }

    console.log(JSON.stringify(test, null, 4))

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

router.post('/getInfoAndFavorite', async (req, res) => {
  const id = req.body.cheapestDealID

  const apiURL = `https://www.cheapshark.com/api/1.0/deals?id=${id}`

  const results = await axios.get(apiURL)
  console.log(results.data)
  try {
    const userID = req.body.userID
    const title = results.data.gameInfo.name
    const metacriticLink = results.data.gameInfo.metacriticLink
    const dealID = id
    const storeID = results.data.gameInfo.storeID
    const gameID = results.data.gameInfo.gameID
    const salePrice = results.data.gameInfo.salePrice
    const normalPrice = results.data.gameInfo.retailPrice
    // const isOnSale = results.data.gameInfo.isOnSale;
    const savings = normalPrice - salePrice
    const metacriticScore = results.data.gameInfo.metacriticScore
    const steamRatingText = results.data.gameInfo.steamRatingText
    const steamRatingPercent = results.data.gameInfo.steamRatingPercent
    const steamRatingCount = results.data.gameInfo.steamRatingCount
    const steamAppID = results.data.gameInfo.steamAppID
    const releaseDate = results.data.gameInfo.releaseDate
    const lastChange = results.data.gameInfo.lastChange
    // const dealRating = results.data.gameInfo.dealRating
    const thumb = results.data.gameInfo.thumb

    console.log(normalPrice)
    console.log(salePrice)
    const isOnSale = (salePrice, normalPrice) => {
      if (salePrice < normalPrice) {
        return true
      } else {
        return false
      }
    }
    const isOnSaleBool = isOnSale(salePrice, normalPrice)

    const dealRatingChecker = (salePrice, normalPrice) => {
      const deal = salePrice / normalPrice
      console.log(deal)
      return deal
    }

    const dealValue = dealRatingChecker(salePrice, normalPrice)
    console.log(dealValue)

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

    // move me to the end of the try-catch

    const newGame = await db.games.build({
      title: title,
      metacriticLink: metacriticLink,
      dealID: dealID,
      storeID: storeID,
      gameID: gameID,
      salePrice: parseFloat(salePrice),
      normalPrice: parseFloat(normalPrice),
      isOnSale: isOnSaleBool,
      savings: parseFloat(savings).toFixed(2),
      metacriticScore: metacriticScore,
      steamRatingText: steamRatingText,
      steamRatingPercent: steamRatingPercent,
      steamRatingCount: steamRatingCount,
      steamAppID: steamAppID,
      releaseDate: releaseDate,
      lastChange: lastChange,
      dealRating: dealValue,
      thumb: thumb,
      userID: userID,
      steamCheckerBool: steamCheckerBool,
      scoreColor: scoreColor
    })

    const savedGame = await newGame.save()

    res.status(200).json({ message: 'OK', savedGame })
  } catch (e) {
    res.status(500).json({ message: 'An error has occured', error: e })
  }
})

router.post('/viewFavorites', (req, res) => {
  console.log(req.body)
  const userID = req.body.userID
  console.log(userID)

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
