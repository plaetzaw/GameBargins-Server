const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const db = require('../models')

router.use(bodyParser.urlencoded({ extended: false }))

router.post('/userInfo', (req, res) => {
  const id = req.body.id

  db.users
    .findOne({
      where: {
        id: id
      },
      attributes: ['username', 'email']
    })
    .then((userInfo) => {
      res.status(200).json(userInfo)
    })
    .catch((err) => {
      console.log(err)
    })
})

module.exports = router
