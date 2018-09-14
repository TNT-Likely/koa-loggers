var log4js = require('log4js')

function log(opts) {
  log4js.addLayout('json', function(config) {
    return opts.formatter
  })

  log4js.configure({
    appenders: {
      dateFile: {
        type: 'dateFile',
        layout: { type: 'json' },
        filename: opts.filename,
        pattern: opts.pattern,
        compress: true,
        daysToKeep: opts.daysToKeep,
      }
    },
    categories: { default: { appenders: ['dateFile'], level: 'all' } },
    pm2: true
  })

  return log4js.getLogger()
}

module.exports = log