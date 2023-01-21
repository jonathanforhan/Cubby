const { format } = require('date-fns')

const fs = require('fs')
const fsp = require('fs').promises
const path = require('path')

const logEvents = async (msg, logName) => {
  const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
  const logItem = `${dateTime}\t${msg}\n`

  try {
    if(!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
      await fsp.mkdir(path.join(__dirname, '..', 'logs'))
    }
    await fsp.appendFile(path.join(__dirname, '..', 'logs', logName), logItem)
  } catch (err) {
    console.log(`logging error at ${dateTime}\t:\t${err}`)
  }
}

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'request_logs.txt')
  //console.log(`${req.method} ${req.path}`)
  next()
}

module.exports = { logger, logEvents }
