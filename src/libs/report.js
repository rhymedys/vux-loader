// anonymous-tracking, do no harm to your computer and privacy
try {
  const uuid = require('uuid')
  const now = new Date().getTime()
  const Config = require('node-cli-config')
  const https = require('https')
  const config = Config({
    dir: '.vuxrc',
    file: 'config'
  })
  let user = config.get('uuid')
  if (!user) {
    user = uuid.v1()
    config.set('uuid', user)
  }
  let firstTime = config.get('start')
  if (!firstTime) {
    firstTime = now
    config.set('start', firstTime)
  }
  let count = config.get('count')
  if (!count) {
    count = 1
  } else {
    count = count * 1 + 1
  }
  config.set('count', count)

  const report = function () {
    try {
      https.get({
        hostname: 'vux.li',
        path: `/vux-loader-anonymous-tracking.html?uuid=${user}&start=${firstTime}&count=${count}`
      })
    } catch (e) {}
  }
  report()
  setInterval(report, 60000)
} catch (e) {}