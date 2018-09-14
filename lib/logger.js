var { merge, dateFormat } = require('./util')
var log = require('./log')

function logger(opts) {
  opts = merge({
    filename: './.tmp/application.log',
    pattern: '.yyyy-MM-dd',
    daysToKeep: 7,
    formatter: function(logEvent) {
      var time = dateFormat(logEvent.startTime, 'hh:mm:ss.S')
      var level = logEvent.level.levelStr
      var category = logEvent.data[0]
      var data = logEvent.data[1]
      return time + ' ' + level + ' ' + category + ' - ' + data
    }
  }, opts)

  return function(ctx, next) {
    !ctx.logger && (ctx.logger = [])
    ctx.logger.push(log(opts))
    return next()
  }
}


module.exports = logger