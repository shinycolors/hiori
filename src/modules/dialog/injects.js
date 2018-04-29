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
    setInterval(this.checkScene.bind(this), 100)
  }

  loadTranslations() {
    // Load the translation language that will be used
    this.localMessages = Messages[this.lang]
    this.translations = {}
    this.localMessages.forEach(msg => {
      this.translations[msg.jp] = msg.tl
    })
  }

  checkScene() {
    // Check if the scene has changed
    if (!window.aoba) return
    if (!window.aoba.sceneManager) return
    if (!window.aoba.sceneManager.currentScene) return
    if (this.lastScene === window.aoba.sceneManager.currentScene) return
    this.lastScene = window.aoba.sceneManager.currentScene
    console.log('sceneChanged', this.lastScene)
    // Register enter listener to wait for resources
    setTimeout(() => {
      console.log('sceneEntered', this.lastScene)
      this.detectDialog(this.lastScene)
    }, 100)
  }

  detectDialog(scene) {
    console.log('detecting dialog', scene);
    // Check if scene has dialog
    this.findDialogFromScene(scene)
    scene.children.forEach(sceneChildrenL1 => {
      this.findDialogFromScene(sceneChildrenL1)
      sceneChildrenL1.children.forEach(sceneChildrenL2 => {
        this.findDialogFromScene(sceneChildrenL2)
      })
    })
  }

  findDialogFromScene(scene) {
    // Regular dialog
    if (scene._eventTracks)
      this.translate(scene._eventTracks)
    // Event dialogs
    if (scene._trackManager && scene._trackManager._tracks)
      this.translate(scene._eventTracks)
  }

  translate(dialogList) {
    console.log('translating', dialogList)
    // Translate the full dialog event
    return dialogList.map(dialog => {
      if (dialog.speaker && this.translations[dialog.speaker])
        dialog.speaker = this.translations[dialog.speaker]
      if (dialog.text && this.translations[dialog.text])
        dialog.text = this.translations[dialog.text]
      return dialog
    })
  }

}

export default Dialog
