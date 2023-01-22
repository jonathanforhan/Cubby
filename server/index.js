require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const { urlencoded } = require('body-parser')
const PORT = process.env.PORT || 3001

const connectDB = require('./config/dbConnect')
const corsConf = require('./config/corsConf')
const { logger } = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')
const verifyJWT = require('./middleware/verifyJWT')
const credentials = require('./middleware/credentials')

// connect to mongodb
connectDB()

app.use(logger)
app.use(credentials)
app.use(cors(corsConf))

app.use(urlencoded({ encoded: true }))
app.use(express.json())
app.use(cookieParser())

// Utility routes
app.use('/register', require('./routes/register'))
app.use('/auth', require('./routes/auth')) // login
app.use('/refresh', require('./routes/refresh'))

// Access barrier
app.use(verifyJWT)

// Cubby routes
//app.use('/api', require('./routes/api/'))

app.use(errorHandler)

mongoose.connection.once('open', () => {
  console.log(`\n\tconnected to MongoDB ${mongoose.modelNames()}`)
  app.listen(PORT, () => console.log(`\tserver listening on port: ${PORT}\n`))
})
