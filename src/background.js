import modules from '@modules'

console.info('! background script !')

Object.keys(modules).forEach(moduleName => {
  if (modules[moduleName].background) {
    let module = new modules[moduleName].background
    module.run()
  }
})
