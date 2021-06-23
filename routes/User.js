require('dotenv').config()
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const moment = require('moment')
const SALT = 2
const jwt = require('jsonwebtoken')
const db = require('../models')
const { sequelize } = require('../models')

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
    // console.log('starting pass', password)
    const hashedpassword = await bcrypt.hash(password, SALT)
    // console.log('hashed pass', hashedpassword)

    const newUser = await db.users.create({
      username: req.body.username,
      email: email,
      password: hashedpassword,
      moneysaved: 0
    })

    console.log(newUser)

    const token = jwt.sign(newUser, process.env.JWT_SECRET)

    res.status(200).json({ message: 'New User Created', newUser, token: token })
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
    // console.log(checkUser)
    if (checkUser) {
      console.log('did we get here?')
      const checkPassword = await bcrypt.compare(password, checkUser.password)
      console.log('Password correct?', checkPassword)
      if (checkPassword === true) {
        const username = checkUser.username
        const id = checkUser.id
        const email = checkUser.email
        const moneysaved = checkUser.moneysaved

        const user = {
          id: id,
          name: username,
          email: email,
          moneysaved: moneysaved
        }
        const token = jwt.sign(user, process.env.JWT_SECRET)
        // const days = 1
        // const cookieExpires = new Date(moment().add(days, 'days').toDate())
        // These will need to be set to true for production
        // const cookieOptions = { expires: cookieExpires, httpOnly: false, useHttps: false }
        res
          // .cookie('jwt', token, cookieOptions)
          .status(200).json({ message: 'USER LOGGED IN', token: token, user })

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

router.post('/Logout', async (req, res) => {
  try {
    const LogoutUser = await db.users.findOne({
      where: {
        email
      }
    })
  } catch (e) {

  }
})

router.post('/updateSavings', async (req, res) => {
  const savings = req.body.savings
  const email = req.body.email
  console.log(savings, email)

  console.log('Logging in user', email)
  try {
    const checkUser = await db.users.findOne({
      where: {
        email
      }
    })
    if (checkUser) {
      console.log('Incoming savings from FE', savings)
      const addedSavings = checkUser.moneysaved += savings
      console.log('Here are your updated savings', addedSavings)
      const updateSavings = await db.users.update({ moneysaved: addedSavings }, {
        where: { email: email }
      })
      console.log('Here are your total savings', updateSavings)
    }
    res.sendStatus(200).json({ message: 'Your savings have been updated', 'Current Savings': checkUser.moneysaved })
  } catch (e) {
    res.sendStatus(500).json({ message: 'AN UNKNOWN ERROR HAS OCCURED', error: e })
    console.log(e)
  }
})

router.post('/auth', async (req, res) => {
  // send the JWT from the header, decode the JWT and check to see if the token matches
  const cookie = req.cookie
})

router.post('/total', async (req, res) => {
  try {
    const total = await db.users.findAll({
      attributes: ['moneysaved',
        [sequelize.fn('SUM', sequelize.col('moneysaved')), 'total']
      ],
      group: ['moneysaved']
    })
    console.log(total.dataValues)
    res.sendStatus(200).json({ message: 'Total SAvings', total })
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
