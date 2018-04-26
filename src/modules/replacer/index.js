import HioriSDK from '@sdk'
import images from './images'

class Replacer extends HioriSDK.Module {

  constructor() {
    super()
    this.lang = 'en'
  }

  backgroundScript() {
    console.log('Starting replacer....');
    let filter = { urls: [ '*://shinycolors.enza.fun/assets/*' ] }
    let opts = [ 'blocking' ]
    chrome.webRequest.onBeforeRequest.addListener(this.onBeforeRequest.bind(this), filter, opts)
  }

  onBeforeRequest(details) {
    let replacementImage = this.getReplacementImage(details.url)
    if (!replacementImage) return null
    return { redirectUrl: replacementImage }
  }

  getReplacementImage(url) {
    let assetHash = url.split('/').pop()
    return images[this.lang][assetHash] || null
  }

}

export default Replacer
