const User = require('../model/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.status(401).json({ error: 'No valid cookies with jwt', src: 'refreshTokenController' });
  const refreshToken = cookies.jwt

  const foundUser = await User.findOne({ refreshToken }).exec()
  if (!foundUser) return res.status(403).json({ error: 'forbidden', src: 'refreshTokenController' })

  // evaluate jwt 
  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH,
    async (err, decoded) => {
      if (err || foundUser.email !== decoded.email) {
        if(foundUser) foundUser.refreshToken = null
        await foundUser.save()

        res.clearCookie()
        return res.send(403).json({ error: 'forbidden all cookies revoked', src: 'refreshTokenController' });
      }
      const accessToken = jwt.sign(
        {
          firstname: foundUser.firstname,
          lastname: foundUser.lastname,
          email: decoded.email,
          phoneNumber: foundUser.phoneNumber
        },
        process.env.JWT_ACCESS,
        { expiresIn: '10m' }
      )
      const refreshToken = jwt.sign(
        { email: decoded.email },
        process.env.JWT_REFRESH,
        { expiresIn: '1d' }
      )
      foundUser.refreshToken = refreshToken
      await foundUser.save()

      res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 })
      res.json({ success: 'authenticated', token: accessToken })
    }
  )
}

module.exports = { handleRefreshToken }
