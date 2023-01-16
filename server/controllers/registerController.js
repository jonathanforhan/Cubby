const User = require('../model/User')
const bcrypt = require('bcrypt')

const handleNewUser = async (req, res) => {
  const { username, email, password } = req.body
  if(!username || !email || !password) {
    console.log(req)
    return res.status(400).json({ 'message': 'missing one or all required fields' })
  }

  // check for dupes
  const duplicate_user = await User.findOne({ email: email }).exec()
  const duplicate_email = await User.findOne({ username: username }).exec()
  if(duplicate_user) return res.sendStatus.sendStatus(409).json({ 'message': 'username already taken' })
  if(duplicate_email) return res.sendStatus.sendStatus(409).json({ 'message': 'email already taken' })

  try {
    // encrypt password
    const hashedPassword = await bcrypt.hash(password, 10)

    // create and store new user
    await User.create({
      'username': username,
      'email': email,
      'password': hashedPassword
    })

    console.log(`new user ${username} created`)

    res.status(201).json({ 'success': `new user ${username} created` })
  } catch (err) {
    res.status(500).json({ 'message': 'err.message' })
  }
}

module.exports = { handleNewUser }
