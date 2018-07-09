import HioriSDK from '@sdk'
import modules from '@modules/background.js'

class BackgroundEntry extends HioriSDK.Entry {

  start() {
    let globalOptions = new HioriSDK.Options('global')
    // Run imported modules
    this.runModules(modules)

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      if (request.method == "getLocalStorage") {
        sendResponse({config: localStorage.getItem('config')});
      } else {
        sendResponse({});
      }
    })
  }

}



let main = new BackgroundEntry()
main.start()
