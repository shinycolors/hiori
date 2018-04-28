import HioriSDK from '@sdk'
import Messages from './locale'

class Dialog extends HioriSDK.ContentScript {

  constructor() {
    super()
    this.lang = 'en_us'
    this.lastScene = null
    this.translations = null
  }

  run() {
    console.info('! dialog !')
    this.loadTranslations()
    setInterval(this.detectDialog.bind(this), 500)
  }

  loadTranslations() {
    // Load the translation language that will be used
    this.localMessages = Messages[this.lang]
    this.translations = {}
    this.localMessages.forEach(msg => {
      this.translations[msg.jp] = msg.tl
    })
  }

  hasSceneChanged() {
    // Check if scene has changed from last check
    let sceneChanged = this.lastScene !== window.aoba.sceneManager.currentScene

    // Assign current scene as the last
    this.lastScene = window.aoba.sceneManager.currentScene

    // Return result
    return sceneChanged
  }

  detectDialog() {
    // Check if scene has dialog
    if (!window.aoba) return
    if (!window.aoba.sceneManager) return
    if (!window.aoba.sceneManager.currentScene) return
    if (!window.aoba.sceneManager.currentScene.children.length) return
    if (!window.aoba.sceneManager.currentScene.children[0].children.length) return
    if (!window.aoba.sceneManager.currentScene.children[0].children[0]._eventTracks) return

    // Confirmed it has dialog, check if the scene has changed
    if (this.hasSceneChanged()) {
      // There is dialog, and this is a new scene, handle translations
      let dialogList = window.aoba.sceneManager.currentScene.children[0].children[0]._eventTracks
      dialogList = this.translate(dialogList)
    }
  }

  translate(dialogList) {
    // Translate the full dialog event
    return dialogList.map(dialog => {
      if (this.translations[dialog.speaker])
        dialog.speaker = this.translations[dialog.speaker]
      if (this.translations[dialog.text])
        dialog.text = this.translations[dialog.text]
      return dialog
    })
  }

}

export default Dialog
