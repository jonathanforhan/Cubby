const User = require('../model/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(401).json({ error: 'No valid cookies with jwt', src: 'refreshTokenController' });
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) return res.status(403).json({ error: 'forbidden', src: 'refreshTokenController' })

  // evaluate jwt 
  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH,
    (err, decoded) => {
      if (err || foundUser.email !== decoded.email) return res.sendStatus(403);
      const accessToken = jwt.sign(
        {
          UserInfo: {
            email: decoded.email,
          }
        },
        process.env.JWT_ACCESS,
        { expiresIn: '10m' }
      )
      res.json({ success: 'authenticated', token: accessToken })
    }
  )
}

module.exports = { handleRefreshToken }
