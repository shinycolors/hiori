class Entry {

  runModules(modules) {
    Object.keys(modules).forEach(moduleName => {
      if (modules[moduleName][this.NAME]) {
        let module = new modules[moduleName][this.NAME]
        module.run()
      }
    })
  }

}

export default Entry
