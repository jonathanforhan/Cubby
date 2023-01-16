const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
  } catch (err) {
    console.log(`connection to MongoDB failed error: ${err}`)
  }
}

module.exports = connectDB
