var {
  merge,
  dateFormat
} = require('./util')
var log = require('./log')
const path = require('path')

function logger(opts) {
  opts = merge({
    filename: path.join(
      process.env.HOME || process.env.USERPROFILE,
      'logs',
      'name',
      'application.log'
    ),
    pattern: '_yyyy-MM-dd',
    keepFileExt: true,
    daysToKeep: 7,
    formatter: function (logEvent) {
      var time = dateFormat(logEvent.startTime, 'hh:mm:ss.S')
      var level = logEvent.level.levelStr
      var category = logEvent.data[0]
      var data = logEvent.data[1]
      return time + ' ' + level + ' ' + category + ' - ' + data
    }
  }, opts)

  const logger = log(opts)
  global.Log = logger

  return function (ctx, next) {
    if (!ctx.logger) {
      ctx.logger = []
      ctx.log = logger
    }
    ctx.logger.push(logger)
    return next()
  }
}


module.exports = logger