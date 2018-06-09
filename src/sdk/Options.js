import moduleMetas from '@modules/options.js'

class Options {

  constructor(moduleName) {
    this.config = {}
    this.module = moduleName
    this.load()
  }

  load() {
    if (!localStorage.getItem('config')) {
      this.config = {}
      this.save()
    } else {
      this.config = JSON.parse(localStorage.getItem('config')) || {}
    }
    if (!this.config[this.module]) {
      this.config[this.module] = {}
      moduleMetas[this.module].options.forEach(v => {
        this.config[this.module][v.id] = v.default
      })
      this.save()
    }
  }

  save() {
    console.log('config', this.config);
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
