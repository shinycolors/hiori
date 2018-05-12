
class Options {

  constructor(moduleName) {
    this.config = {}
    this.module = moduleName
  }

  load() {
    if (!localStorage.getItem('config')) localStorage.setItem('config', '{}')
    this.config = JSON.parse(localStorage.getItem('config')) || {}
  }

  save() {
    localStorage.setItem('config', JSON.stringify(this.config))
  }

  get(optionId, moduleName = this.module) {
    this.load()
    if (!this.config[moduleName]) this.config[moduleName] = {}
    return this.config[moduleName][optionId] || null
  }

  set(optionId, value, moduleName = this.module) {
    this.load()
    if (!this.config[moduleName]) this.config[moduleName] = {}
    this.config[moduleName][optionId] = value
    this.save()
  }

}

export default Options
