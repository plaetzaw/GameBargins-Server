const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const axios = require('axios')
const db = require('../models')
// const db = require('../models')

router.use(bodyParser.urlencoded({ extended: false }))

router.post('/getAlerts', async (req, res) => {
  const userID = req.body.userID

  console.log(userID)

  db.alerts
    .findAll({
      where: {
        userID: userID
      }
    })
    .then((alerts) => {
      res.status(200).json(alerts)
    })
    .catch((err) => {
      console.log(err)
    })

  // try {
  //   const alerts = await db.alerts.findAll({
  //     where: {
  //       userID: userID
  //     }
  //   })
  //   console.log(alerts)
  //   res.status(200).json('Here are your alerts', alerts)
  // } catch (e) {
  //   res.status(500).json('AN ERROR HAS OCCURED', e)
  // }
})

router.post('/setAlert', async (req, res) => {
  const gameID = req.body.gameID
  const email = req.body.email
  const price = req.body.price
  const title = req.body.title
  const userID = req.body.userID
  const setprice = req.body.setprice
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
    res.status(200).json({ message: `Alert set for ${title} ID: ${gameID} at ${price} to ${email}` })
  } catch (e) {
    res.status(500).json({ message: 'An error has occured', error: e })
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
