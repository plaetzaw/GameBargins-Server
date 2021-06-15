const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const axios = require('axios')
const db = require('../models')
// const db = require('../models')

router.use(bodyParser.urlencoded({ extended: false }))

router.post('/setAlert', async (req, res) => {
  const gameID = req.body.gameID
  const email = req.body.email
  const price = req.body.price
  const title = req.body.title
  const userID = req.body.userID
  const setprice = req.body.salesPrice
  const apiURL = `https://www.cheapshark.com/api/1.0/alerts?action=set&email=${email}&gameID=${gameID}&price=${price}`
  try {
    const setAlertAndSave = await Promise.all([axios.get(apiURL),
      db.alerts.create({
        userID: userID,
        email: email,
        title: title,
        gameID: gameID,
        desiredprice: price,
        setprice: setprice
      })])
    // const setAlert = await axios.get(apiURL)
    // const newAlert = await db.alerts.create({
    //   userID: userID,
    //   email: email,
    //   title: title,
    //   gameId: gameID,
    //   desiredprice: price,
    //   setprice: setprice
    // })
    console.log(setAlertAndSave)
  } catch (e) {
    console.log(e)
  }
  // axios
  //   .get(apiURL)
  //   .then((newAlert) => {
  //     console.log(newAlert)
  //     res
  //       .status(200)
  //       .json({ message: `Alert set for ${gameID} at ${price} to ${email}` })
  //   })
  //   .catch((err) => console.error(err))
})

module.exports = router
