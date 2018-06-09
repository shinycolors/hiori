import HioriSDK from '@sdk'
import images from './images'
import logicChrome from './browsers/chrome'
import logicFirefox from './browsers/firefox'

class Replacer extends HioriSDK.BackgroundScript {
  get name() { return 'replacer' }

  constructor(env) {
    super()
    if (!this.options.get('enabled')) return;
    this.browser = env.browser
    this.lang = this.options.get('lang', 'global')
  }

  run() {
    if (!this.options.get('enabled')) return;

    if (this.browser == HioriSDK.Browser.CHROME) {
      console.info('! replacer-chrome !', this.lang)
      logicChrome(images[this.lang])

    } else if (this.browser == HioriSDK.Browser.FIREFOX) {
      console.info('! replacer-firefox !', this.lang)
      logicFirefox(images[this.lang])

    } else {
      console.info('^ replacer cannot run on', this.browser,'^')
    }
  }

}

export default Replacer
