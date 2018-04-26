// const dot = require('dot-object')
// const req = require.context('./', true, /^((?!index).)*(.js)$/)
//
// let modules = {}
//
// req.keys().forEach(path => {
//   let dotNotationPath = path.substring(2).replace('/', '.')
//   modules[dotNotationPath] = req(path)
// })
//
// let SDK = dot.object(modules)
//
// module.exports = SDK

import Module from './Module'

export default {
  Module
}
