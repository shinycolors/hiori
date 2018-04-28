import HioriSDK from '@sdk'
import modules from '@modules'

class BackgroundEntry extends HioriSDK.Entry {
  get NAME(){ return 'background' }

  constructor() {
    super()
  }

  start() {
    console.info('! background script !')
    super.start(modules)
  }

}

let main = new BackgroundEntry()
main.start()
