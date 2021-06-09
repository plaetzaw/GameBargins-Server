const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const db = require('../models')
const bcrypt = require('bcrypt')
const SALT = 15

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

router.post('/updateUsername', async (req, res) => {
  const id = req.body.id
  const username = req.body.username
  const updatedusername = req.body.updatedusername

  try {
    const persistUser = await db.users.findOne({
      where: { id }
    })

    if (persistUser) {
      persistUser.username = updatedusername

      await persistUser.save({
        fields: ['username']
      })

      res
        .status(200)
        .json({ message: `Success, your new username is ${username}` })
    } else res.status(500).json({ message: 'Something went wrong' })
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: e })
  }
})

router.post('/updateEmail', async (req, res) => {
  const id = req.body.id
  const updatedemail = req.body.email

  try {
    const persistUser = await db.users.findOne({
      where: { id }
    })

    if (persistUser) {
      persistUser.email = updatedemail

      await persistUser.save({
        fields: ['email']
      })

      res.status(200).json({ message: 'Success, your email has been updated' })
    } else res.status(500).json({ message: 'Something went wrong' })
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: e })
  }
})

router.post('/updatePassword', async (req, res) => {
  const id = req.body.id
  const password = req.body.password

  try {
    const persistUser = await db.users.findOne({
      where: { id }
    })
    if (persistUser) {
      const newpassword = await bcrypt.hash(password, SALT)
      persistUser.password = newpassword

      await persistUser.save({
        fields: ['password']
      })
      res
        .status(200)
        .json({ message: 'Success, your password has been updated' })
    } else res.status(500).json({ message: 'Something went wrong' })
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: e })
  }
})

module.exports = router
