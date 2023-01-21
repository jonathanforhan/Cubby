const User = require('../model/User')
const bcrypt = require('bcrypt')

const handleNewUser = async (req, res) => {

  const { firstname, lastname, email, phoneNumber, password } = req.body
  if(!firstname || !lastname || !email || !phoneNumber || !password) {
    return res.status(400).json({ error: 'Missing field data', src: 'registerController' })
  }

  // check for dupes
  const duplicateEmail = await User.findOne({ email: email }).exec()
  if(duplicateEmail) {
    return res.status(409).json({ error: 'Email is already in use', src: 'registerController' })
  }
  const duplicatePhoneNumber = await User.findOne({ phoneNumber: phoneNumber }).exec()
  if(duplicatePhoneNumber) {
    return res.status(409).json({ error: 'Phone number is already in use', src: 'registerController' })
  }

  try {
    // encrypt password
    const hashedPassword = await bcrypt.hash(password, 10)

    // create and store new user
    await User.create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      phoneNumber: phoneNumber,
      password: hashedPassword
    })

    console.log(`new user ${firstname} ${lastname} created`)

    res.status(201).json({ success: `new user ${firstname} ${lastname} created` })
  } catch (err) {
    res.status(500).json({ error: err.message, src: 'registerController' })
  }
}

module.exports = { handleNewUser }
