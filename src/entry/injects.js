import HioriSDK from '@sdk'
import modules from '@modules/injects.js'

class InjectsEntry extends HioriSDK.Entry {

  start() {
    // Run imported modules
    this.runModules(modules)
  }

}

let main = new InjectsEntry()
main.start()
