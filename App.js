const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const PORT = process.env.PORT || 8080

require('dotenv').config()

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

// JWT
const { authUser } = require('./utility/auth')

// Routes
app.use(require('./routes/User'))
app.use(require('./routes/Search'))
app.use(require('./routes/Dashboard', authUser))
app.use(require('./routes/Game', authUser))
app.use(require('./routes/Alerts', authUser))

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
