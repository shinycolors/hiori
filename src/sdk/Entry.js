class Entry {

  constructor() {
    this.env = ENV
  }

  runModules(modules) {
    Object.keys(modules).forEach(moduleName => {
      if (modules[moduleName]) {
        let module = new modules[moduleName]
        module.run()
      }
    })
  }

}

export default Entry
