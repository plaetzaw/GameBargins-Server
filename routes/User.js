require('dotenv').config()
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const SALT = 2
const jwt = require('jsonwebtoken')
const db = require('../models')

router.use(bodyParser.urlencoded({ extended: false }))

router.post('/register', async (req, res) => {
  console.log('Beginning user registration')
  const email = req.body.email
  try {
    const checkEmail = await db.users.findOne({
      where: {
        email
      }
    })
    if (checkEmail) {
      res.status(400).json({ message: 'EMAIL ALREADY EXSITS, PLEASE SELECT ANOTHER' })
    }
    const password = req.body.password
    console.log('starting pass', password)
    const hashedpassword = await bcrypt.hash(password, SALT)
    console.log('hashed pass', hashedpassword)

    const newUser = await db.users.build({
      //   firstname: req.body.firstname,
      //   lastname: req.body.lastname,
      username: req.body.username,
      email: email,
      password: hashedpassword
    })
    const savedUser = newUser.save()

    res.status(200).json({ message: 'New User Created', newUser })
  } catch (e) {
    res.status(500).json({ message: 'An error has occured', error: e })
  }
})

router.post('/login', async (req, res) => {
  const email = req.body.email
  const password = req.body.password

  console.log('Logging in user', email)
  try {
    const checkUser = await db.users.findOne({
      where: {
        email
      }
    })
    console.log(checkUser)
    if (checkUser) {
      console.log('did we get here?')
      const checkPassword = await bcrypt.compare(password, checkUser.password)
      console.log('Password correct?', checkPassword)
      if (checkPassword === true) {
        const username = checkUser.username
        const id = checkUser.id
        const email = checkUser.email

        const user = {
          id: id,
          name: username,
          email: email
        }
        const token = jwt.sign(user, process.env.JWT_SECRET)
        // res.json({ token: token })
        res.status(200).json({ message: 'USER LOGGED IN', token: token, user })

        console.log('User logged in', token, user)
      } else {
        res.status(400).json({ message: 'WRONG PASSWORD, PLEASE CHECK YOUR PASSWORD' })
      }
    } else {
      res.status(404).json({ message: 'NO EMAIL FOUND, PLEASE CHECK THE PROVIDED EMAIL' })
    }
  } catch (e) {
    res.status(500).json({ message: 'AN UNKNOWN ERROR HAS OCCURED', error: e })
  }
})
module.exports = router
