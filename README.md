# koa-logger

koa2的日志中间件

## 如何使用


安装

```javascript
yarn add koa-loggers -S
```

使用

```javascipt
var koaLoggers = require('koa-loggers')
app.use(koaLoggers({
  appname: 'xxxxxx'
}))
ctx.logger[0].error('log category','some messgae')
```

[更多使用](https://github.com/log4js-node/log4js-node)

## 兑吧专用配置项
- config.appname [string] 应用名称

## 其他可选配置项

- config.filename [string] 日志文件路径 默认值 './.tmp/application.log'
- config.pattern [string] [日志分割格式](https://log4js-node.github.io/log4js-node/dateFile.html) 默认值 '.yyyy-MM-dd'
- daysToKeep [Number] 日志保留天数，默认7天
- config.formatter [function] 日志内容格式化函数 默认值如下

```javascript
function(logEvent) {
  var time = dateFormat(logEvent.startTime, 'hh:mm:ss.S')
  var level = logEvent.level.levelStr
  var category = logEvent.data[0]
  var data = logEvent.data[1]
  return time + ' ' + level + ' ' + category + ' - ' + data
}
```

## 注意事项

- 本中间件可以多次添加, 所以ctx.logger对象为一个数组
- 如果本项目用pm2部署, [还需要安装模块 pm2 install pm2-intercom](https://log4js-node.github.io/log4js-node/clustering.html)
