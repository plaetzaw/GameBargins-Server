const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const axios = require('axios')
const CircularJSON = require('circular-json')
// const db = require('../models')

router.use(bodyParser.urlencoded({ extended: false }))

router.post('/getStores', async (req, res) => {
  const apiURL = 'https://www.cheapshark.com/api/1.0/stores'

  try {
    const stores = await axios.get(apiURL)
    const activestores = stores.data.filter(store => (store.isActive === 1))

    // const activestores = stores.filter(store => store.isActive === 1)
    // console.log(activestores)
    // const storeresults = CircularJSON.stringify(stores.data)
    res.status(200).send(activestores)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'AN UNKNOWN ERROR HAS OCCURED', error: e })
  }
})

router.post('/getDeals', async (req, res) => {
  try {
    const storeID = req.body.storeID
    const apiURL = `https://www.cheapshark.com/api/1.0/deals?storeID=${storeID}`
    const deals = await axios.get(apiURL)
    res.status(200).send(deals.data)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'AN UNKNOWN ERROR HAS OCCURED', error: e })
  }
})

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

router.post('/advancedSearch', (req, res) => {
  const gameTitle = req.body.gameTitle
  const minPrice = req.body.minPrice
  const maxPrice = req.body.value
  const exactTitleBool = req.body.exactTitle
  const onSale = req.body.onSale
  let sort = req.body.sort

  switch (sort) {
    case 1:
      sort = 'Price'
      break
    case 2:
      sort = 'Game Title'
      break
    case 3:
      sort = 'Savings'
      break
    case 4:
      sort = 'Deal Rating'
      break
    case 5:
      sort = 'Store'
      break
    default:
      sort = 'Price'
  }

  const onSaleChecker = (onSale) => {
    if (onSale === true) {
      return 1
    } else {
      return 0
    }
  }

  const onSaleBool = onSaleChecker(onSale)

  const apiURL = `https://www.cheapshark.com/api/1.0/deals?title=${gameTitle}&exact=${exactTitleBool}&lowerPrice=${minPrice}&lupperPrice=${maxPrice}&onSale=${onSaleBool}&sortBy=${sort}`

  axios
    .get(apiURL)
    .then((results) => {
      const gameJSON = CircularJSON.stringify(results.data)
      res.status(200).send(gameJSON)
    })
    .catch((err) => console.error(err))
})

module.exports = router
