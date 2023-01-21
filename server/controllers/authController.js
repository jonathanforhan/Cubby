const User = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const handleLogin = async (req, res) => {
  
  const { email, password } = req.body
  if(!email || !password) return res.status(400).json({ error: 'Missing email and/or password', src: 'authController' })

  foundUser = await User.findOne({ email: email }).exec()
  if(!foundUser) {
    return res.status(401).json({ error: 'Not registered', src: 'authController' })
  }

  const match = await bcrypt.compare(password, foundUser.password)
  if(!match) return res.status(401).json({ error: 'Incorrect password', src: 'authController' })

  const accessToken = jwt.sign(
    {
      firstname: foundUser.firstname,
      lastname: foundUser.lastname,
      email: foundUser.email,
      phoneNumber: foundUser.phoneNumber
    },
    process.env.JWT_ACCESS,
    { expiresIn: '10m' }
  )
  const refreshToken = jwt.sign(
    { email: foundUser.email },
    process.env.JWT_REFRESH,
    { expiresIn: '1d' }
  )
  //save refresh token with current user
  foundUser.refreshToken = refreshToken
  await foundUser.save()

  res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 })
  res.json({ success: 'authenticated', token: accessToken })
}

module.exports = { handleLogin }
