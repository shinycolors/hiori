import HioriSDK from '@sdk'

class DialogChara extends HioriSDK.ContentScript {

  constructor() {
    super()
    this.lang = 'en'
    this.lastScene = null
  }

  run() {
    console.info('! dialog-chara !')
    setInterval(this.checkSceneChange.bind(this), 2000)
  }

  checkSceneChange() {
    // If last scene is same as current scene, no change
    if (!window.aoba) return
    if (this.lastScene === window.aoba.sceneManager.currentScene) return

    // Assign current scene as the last
    this.lastScene = window.aoba.sceneManager.currentScene

    // Scene has changed
    this.sceneChanged()
  }

  sceneChanged() {
    console.log('Scene changed')
    // Check if scene has dialog
    if (!aoba) return
    if (!aoba.sceneManager) return
    if (!aoba.sceneManager.currentScene) return
    if (!aoba.sceneManager.currentScene.children.length) return
    if (!aoba.sceneManager.currentScene.children[0].children.length) return
    if (!aoba.sceneManager.currentScene.children[0].children[0]._eventTracks) return
    // Confirmed it has dialog
    console.log('DIALOG', aoba.sceneManager.currentScene.children[0].children[0]._eventTracks)
  }

}

export default DialogChara
