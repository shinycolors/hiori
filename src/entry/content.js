import HioriSDK from '@sdk'
import modules from '@modules/content.js'

class ContentEntry extends HioriSDK.Entry {

  start() {
    // Run imported modules
    this.runModules(modules)

    // On window load, inject the injection scripts into the webpage
    window.addEventListener('load', function(event) {
      let injects = document.createElement('script')
      injects.src = chrome.extension.getURL('injects.js')
      document.body.appendChild(injects)
    })
  }

}

let main = new ContentEntry()
main.start()
