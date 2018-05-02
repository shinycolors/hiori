import HioriSDK from '@sdk'
import modules from '@modules/options.js'

class OptionsEntry extends HioriSDK.Entry {

  start() {
    console.log('! options !');
    // Run imported modules
    this.runModules(modules)

  }

}

let main = new OptionsEntry()
main.start()
