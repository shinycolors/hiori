import HioriSDK from '@sdk'
import modules from '@modules'

class InjectsEntry extends HioriSDK.Entry {
  get NAME(){ return 'injects' }

  constructor() {
    super()
  }

  start() {
    console.info('! injects !')
    super.start(modules)
  }

}

let main = new InjectsEntry()
main.start()
