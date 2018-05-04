import HioriSDK from '@sdk'
import modules from '@modules/background.js'

class BackgroundEntry extends HioriSDK.Entry {

  start() {
    // Run imported modules
    this.runModules(modules)
  }

}

let main = new BackgroundEntry()
main.start()
