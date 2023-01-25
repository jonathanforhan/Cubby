const Cubby = require('../../model/Cubby')
const User = require('../../model/User')

const getCubby = async (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.status(401).json({ error: 'No valid cookies with jwt', src: 'getCubbyController' });
  const refreshToken = cookies.jwt

  const foundUser = await User.findOne({ refreshToken }).exec()
  if (!foundUser) return res.status(403).json({ error: 'forbidden', src: 'getCubbyController' })

  const foundCubbies = await Cubby.find({ 'users[creator]': foundUser.email }).exec()
  if(!foundCubbies || foundCubbies.length === 0) return res.json({ error: 'no cubby', src: 'getCubbyController' })

  res.status(201).json({ success: 200, cubbies: foundCubbies })
}

module.exports = { getCubby }
