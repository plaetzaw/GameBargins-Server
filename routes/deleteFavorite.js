const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const db = require('../models')

router.use(bodyParser.urlencoded({ extended: false }))

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
