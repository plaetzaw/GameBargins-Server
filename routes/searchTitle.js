const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const axios = require('axios')
const CircularJSON = require('circular-json')
const db = require('../models')

router.use(bodyParser.urlencoded({ extended: false }))

router.post('/searchTitle', (req, res) => {
  const gameTitle = req.body.gameTitle

  const apiURL = `https://www.cheapshark.com/api/1.0/deals?title=${gameTitle}`

  axios
    .get(apiURL)
    .then((results) => {
      const gameJSON = CircularJSON.stringify(results.data)
      res.status(200).send(gameJSON)
    })
    .catch((err) => console.error(err))
})

router.post('/searchSingleResultTitle', (req, res) => {
  const gameTitle = req.body.gameTitle

  const apiURL = `https://www.cheapshark.com/api/1.0/games?title=${gameTitle}`
  axios
    .get(apiURL)
    .then((results) => {
      const gameJSON = CircularJSON.stringify(results.data)
      console.log(gameJSON)
      res.status(200).send(gameJSON)
    })
    .catch((err) => console.error(err))
})

module.exports = router
