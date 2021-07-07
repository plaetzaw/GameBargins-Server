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

// let refreshTokens = []

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET)
}

router.post('/register', async (req, res) => {
  const email = req.body.email
  console.log('Beginning user registration checking email', email)

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

    const NewUserRecord = await db.users.create({
      username: req.body.username,
      email: email,
      password: hashedpassword,
      moneysaved: 0
    })
    console.log(NewUserRecord)
    const user = {
      id: NewUserRecord.id,
      email: NewUserRecord.email,
      moneysaved: NewUserRecord.moneysaved
    }

    const days = 1
    const cookieExpires = new Date(moment().add(days, 'days').toDate())
    const accesstoken = generateAccessToken(user)

    // These will need to be set to true for production
    const accesscookieOptions = { expiresIn: cookieExpires, httpOnly: false, useHttps: true }
    console.log(accesstoken)

    res
      .cookie('jwt', accesstoken, accesscookieOptions)
      .status(200).json({ message: 'New User Created', accesstoken, user })
  } catch (e) {
    res.status(500).json({ message: 'An error has occured', error: e })
    console.log(e)
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
        console.log(user)
        const days = 1
        const cookieExpires = new Date(moment().add(days, 'days').toDate())
        // const accesstoken = jwt.sign(user, process.env.JWT_SECRET)

        const accesstoken = generateAccessToken(user)
        // const refreshtoken = jwt.sign(user, process.env.REFRESH_SECRET)

        // These will need to be set to true for production
        const accesscookieOptions = { expiresIn: cookieExpires, httpOnly: false, useHttps: true }
        // const refreshcookieOptions = { expiresIn: cookieExpires, httpOnly: false, useHttps: false }

        // refreshTokens.push(refreshtoken)
        // console.log(refreshTokens)
        res
          .cookie('jwt', accesstoken, accesscookieOptions)
          // .cookie('refresh', refreshtoken, refreshcookieOptions)
          .status(200).json({ message: 'USER LOGGED IN', accesstoken, user })
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
  console.log('show me cookies', req.cookies)
  console.log(req.cookies.jwt)
  // console.log(req.cookies.refresh)
  // console.log('req', req.cookies.jwt)
  // console.log('---')
  // console.log('header? ', req.headers)
  // const refreshtoken = req.cookies.refresh
  // if (refreshtoken === null) return res.sendStatus(401)
  // if (!refreshTokens.includes(refreshtoken)) return res.sendStatus(403)
  // jwt.verify(refreshtoken, process.env.REFRESH_SECRET, (err, user) => {
  //   if (err) return res.sendStatus(403)
  //   const accesstoken = generateAccessToken(user)
  // res.cookie(accesstoken)
  res.status(200).json({ message: 'JWT Verified' })
  // })
  // res.sendStatus(500)
})

// router.post('/Logout', async (req, res) => {
//   console.log('firing logout')
//   try {
//     const usertoken = req.cookies.jwt
//     refreshTokens = refreshTokens.filter(token => token !== usertoken)
//     res.sendStatus(204)
//   } catch (e) {
//     console.log(e)
//     res.sendStatus(500)
//   }
// })

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
