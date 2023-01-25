const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cubbySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  files: {
    type: [String], // file path
  },
  creator: {
    type: String,
  },
  members: {
    type: [String],
  },
  picture: {
    type: String, // url path
  },
  private: {
    type: String,
    required: true,
  },
  password: {
    type: String, // optional password protextion
  }
})

module.exports = mongoose.model('Cubby', cubbySchema)
