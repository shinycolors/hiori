class Entry {

  constructor() {

  }

  start(modules) {
    this.importModules(modules)
  }

  importModules(modules) {
    Object.keys(modules).forEach(moduleName => {
      if (modules[moduleName][this.NAME]) {
        let module = new modules[moduleName][this.NAME]
        module.run()
      }
    })
  }

}

export default Entry
