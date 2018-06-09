import Module from './Module'
import Options from './Options'

class BackgroundScript extends Module {

  constructor() {
    super()
    this.options = new Options(this.name)
  }

}

export default BackgroundScript
