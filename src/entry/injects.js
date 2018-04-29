import HioriSDK from '@sdk'
import modules from '@modules'

class InjectsEntry extends HioriSDK.Entry {
  get NAME(){ return 'injects' }

  start() {
    console.info('! injects !')
    this.runModules(modules)
  }

}

let main = new InjectsEntry()
main.start()
