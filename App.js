const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = process.env.PORT || 8080

require('dotenv').config()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// JWT
const { authUser } = require('./utility/auth')

// Routes
app.use(require('./routes/User'))
app.use(require('./routes/createGameEntry', authUser))
app.use(require('./routes/searchTitle', authUser))
app.use(require('./routes/setAlert', authUser))
app.use(require('./routes/viewSavedGames', authUser))
app.use(require('./routes/deleteFavorite', authUser))
app.use(require('./routes/userSettings', authUser))
app.use(require('./routes/userInfo', authUser))
app.use(require('./routes/advancedSearch', authUser))

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
