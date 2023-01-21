require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 3001

const connectDB = require('./config/dbConnect')
const corsConf = require('./config/corsConf')
const { logger } = require('./middleware/logEvents')
const verifyJWT = require('./middleware/verifyJWT')
const { urlencoded } = require('body-parser')

// connect to mongodb
connectDB()

app.use(logger)
app.use(cors(corsConf))

app.use(urlencoded({ encoded: true }))
app.use(express.json())
app.use(cookieParser())

// Utility routes

app.use('/register', require('./routes/register'))
app.use('/auth', require('./routes/auth')) // login
app.use('/refresh', require('./routes/refresh'))

// access barrier
app.use(verifyJWT)

app.get('/posts', (req, res) => {
  console.log('reached the posts funciton')
  res.json({ 'message': 'Hello World' })
})

mongoose.connection.once('open', () => {
  console.log(`\n\tconnected to MongoDB ${mongoose.modelNames()}`)
  app.listen(PORT, () => console.log(`\tserver listening on port: ${PORT}\n`))
})
