import HioriSDK from '@sdk'
import modules from '@modules'

class BackgroundEntry extends HioriSDK.Entry {
  get NAME(){ return 'background' }

  start() {
    console.info('! background script !')
    this.runModules(modules)
  }

}

let main = new BackgroundEntry()
main.start()
