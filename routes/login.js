require('dotenv').config()
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const db = require('../models')
const jwt = require('jsonwebtoken')

router.use(bodyParser.urlencoded({ extended: false }))

router.post('/login', (req, res) => {
  const username = req.body.username
  const password = req.body.password

  db.users
    .findOne({
      where: {
        username: username
      }
    })
    .then((persistUser) => {
      if (persistUser) {
        bcrypt
          .compare(password, persistUser.password)
          .then((success) => {
            if (success) {
              const token = jwt.sign(
                {
                  id: persistUser.id,
                  username: persistUser.username,
                  email: persistUser.email
                },
                process.env.JWT_SECRET,
                {
                  expiresIn: '4h'
                }
              )

              res
                .status(200)
                .json({ message: 'Successfully logged in!', token: token })
            }
          })
          .catch((err) => console.error(err))
      } else {
        res
          .status(500)
          .json({ message: 'Incorrect credentials, please try again' })
      }
    })
})

module.exports = router
