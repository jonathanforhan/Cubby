const Cubby = require('../../model/Cubby')
const User = require('../../model/User')
const bcrypt = require('bcrypt')

const createCubby = async (req, res) => {
  const newCubby = req.body
  if(!newCubby?.creator) return res.status(400).json({ error: "Invalid cubby format", src: 'createCubbyController' })

  foundUser = await User.findOne({ email: newCubby.creator }).exec()
  if(!foundUser) {
    return res.status(401).json({ error: 'Not registered', src: 'authController' })
  }

  if(newCubby.private === true && newCubby.password) {
    const hashedPassword = await bcrypt.hash(newCubby.password, 10)
    newCubby.password = hashedPassword
  }

  try {
    await Cubby.create(newCubby)
    res.status(201).json({ success: 'new cubby created' })
  } catch (err) {
    res.status(500).json({ error: `cubby creation error: ${err}`, src: 'createCubbyController' })
  }
}


// name
// description
// files
// users
// picture
// private
// password

module.exports = { createCubby }
