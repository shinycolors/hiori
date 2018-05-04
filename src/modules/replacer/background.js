import HioriSDK from '@sdk'
import images from './images'
import logicChrome from './browsers/chrome'
import logicFirefox from './browsers/firefox'

class Replacer extends HioriSDK.BackgroundScript {

  constructor(env) {
    super()
    this.browser = env.browser
    this.lang = 'en'
  }

  run() {
    if (this.browser == HioriSDK.Browser.CHROME) {
      console.info('! replacer-chrome !')
      logicChrome(images[this.lang])

    } else if (this.browser == HioriSDK.Browser.FIREFOX) {
      console.info('! replacer-firefox !')
      logicFirefox(images[this.lang])

    } else {
      console.info('^ replacer cannot run on', this.browser,'^')
    }
  }

}

export default Replacer
