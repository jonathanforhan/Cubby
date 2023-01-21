const whiteList = require('./whiteList')

const corsConf = {
  credentials: true,
  origin: (origin, callback) => {
    if(whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200
}

module.exports = corsConf
