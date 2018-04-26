import modules from '@modules'

Object.keys(modules).forEach(moduleName => {
  let module = new modules[moduleName]
  module.backgroundScript()
})
