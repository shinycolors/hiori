import modules from '@modules'

console.info('! inject script !')

Object.keys(modules).forEach(moduleName => {
  if (modules[moduleName].injects) {
    let module = new modules[moduleName].injects
    module.run()
  }
})
