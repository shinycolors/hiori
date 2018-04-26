// const req = require.context('./', true, /^\.\/((?!(index|\/)).)+$/)
//
// let modules = {}
//
// req.keys().forEach(path => {
//   let moduleName = path.substring(2)
//   modules[moduleName] = req(path)
// })
//
// module.exports = modules

import Replacer from './replacer'

export default {
  Replacer
}
