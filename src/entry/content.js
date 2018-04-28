import HioriSDK from '@sdk'
import modules from '@modules'

class ContentdEntry extends HioriSDK.Entry {
  get NAME(){ return 'content' }

  start() {
    console.info('! content script !')
    this.runModules(modules)

    // On window load, inject the injection scripts into the webpage
    window.addEventListener('load', function(event) {
      console.info('! content script trying to inject !')
      let injects = document.createElement('script')
      injects.src = chrome.extension.getURL('injects.js')
      document.body.appendChild(injects)
    })
  }

}

let main = new ContentdEntry()
main.start()
