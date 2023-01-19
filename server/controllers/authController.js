const User = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const handleLogin = async (req, res) => {
  const { usernameOrEmail, password } = req.body
  if(!usernameOrEmail || !password) return res.status(400).json({ 'msg': 'all fields required' })

  const foundUser = await User.findOne({ username: usernameOrEmail }).exec()
  if(!foundUser) {
    foundUser = await User.findOne({ email: usernameOrEmail }).exec()
    if(!foundUser) {
      return res.sendStatus(401)
    }
  }

  const match = await bcrypt.compare(password, foundUser.password)
  if(!match) return res.sendStatus(401)

  const accessToken = jwt.sign(
    {
      'UserInfo': {
        'username': foundUser.username,
        'email': foundUser.email,
      }
    },
    process.env.JWT_ACCESS,
    { expiresIn: '15m' }
  )
  const refreshToken = jwt.sign(
    { 'username': foundUser.username },
    process.env.JWT_REFRESH,
    { expiresIn: '15m' }
  )
  //save refresh token with current user
  foundUser.refreshToken = refreshToken
  const result = await foundUser.save()
  console.log(`refresh token created for ${foundUser.username}\ton attempt: ${result}`)

  res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 60 * 15 })

  res.json({ accessToken })
}

module.exports = { handleLogin }
