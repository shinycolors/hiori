const path = require('path')
const deepExtend = require('deep-extend')

const ENVIRONMENT = process.env.NODE_ENV || 'production'
const BROWSER = process.env.BROWSER || 'chrome'

const APP_CONFIG = require(path.join(__dirname, 'application', ENVIRONMENT))

module.exports = {
  name: ENVIRONMENT,
  browser: BROWSER,
  appConfig: deepExtend({
    environment: ENVIRONMENT,
    browser: BROWSER
  }, APP_CONFIG)
}
