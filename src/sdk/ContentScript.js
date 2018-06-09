import Module from './Module'
import Options from './Options'

class ContentScript extends Module {

  constructor() {
    super()
    this.options = new Options(this.name)
  }

}

export default ContentScript
