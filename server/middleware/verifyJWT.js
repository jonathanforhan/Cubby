const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization
  if(!authHeader) return res.status(401).json({ error: 'unauthorized', src: 'verifyJWT' })
  const token = authHeader.split(' ')[1]
  jwt.verify(
    token,
    process.env.JWT_ACCESS,
    (err, decoded) => {
      if(err) return res.status(403).json({ error: `forbidden, invalid jwt token err: ${err}`, src: 'verifyJWT' })
      req.email = decoded.email
      next()
    }
  )
}

module.exports = verifyJWT
