require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3001

const connectDB = require('./config/dbConnect')
const corsConf = require('./config/corsConf')

// connect to mongodb
connectDB()

app.use(express.json())

app.use(cors(corsConf))
app.use('/register', require('./routes/register'))
app.use('/auth', require('./routes/auth'))
app.use('/refresh', require('./routes/refresh'))

mongoose.connection.once('open', () => {
  console.log('connected to MongoDB')
  app.listen(PORT, () => console.log(`server listening on port: ${PORT}`))
})
