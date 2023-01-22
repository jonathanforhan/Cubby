const { logEvents } = require('./logEvents')

const errorHandler = (err, req, res, next) => {
  logEvents(`${err.name}: ${err.message}`, 'error_logs.txt')
  console.log(err.stack)
  res.status(500).json({ error: err.message, src: 'Error Handler' })
}

module.exports = errorHandler
