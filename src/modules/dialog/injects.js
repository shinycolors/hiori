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
    this.modifySceneManager()
  }

  loadTranslations() {
    // Load the translation language that will be used
    this.localMessages = Messages[this.lang]
    this.translations = {}
    this.localMessages.forEach(msg => {
      this.translations[msg.jp] = msg.tl
    })
  }

  modifySceneManager() {
    let self = this
    // Override the scene manager's replaceScene() function so we can detect when its fired
    window.aoba.sceneManager._sc3_replaceScene = window.aoba.sceneManager.replaceScene
    window.aoba.sceneManager.replaceScene = function(...replaceSceneArgs){
      // Override the addChild method based on the scene, each one has a different layer hierarchy
      if (replaceSceneArgs[0].auditionSceneName == 'produceAudition') {
        self.overrideAddChild(replaceSceneArgs[0].children[0])
      } else {
        self.overrideAddChild(replaceSceneArgs[0])
      }
      this._sc3_replaceScene(...replaceSceneArgs)
    }
  }

  overrideAddChild(scene) {
    let self = this
    // Override the addChild() function so we know when a new one is spawned
    scene._sc3_addChild = scene.addChild
    scene.addChild = function(...addChildArgs){
      self.findDialogFromScene(addChildArgs[0])
      this._sc3_addChild(...addChildArgs)
    }
  }

  findDialogFromScene(scene) {
    let self = this
    // Regular dialog
    if (scene._eventTracks) {
      if (scene._eventTracks.length) {
        // Event tracks has contents, translate it
        this.translate(scene._eventTracks)
      } else {
        // Event tracks are not yet available, wait for its child to be added
        self.overrideAddChild(scene)
      }
    }
    // Event dialogs
    if (scene._trackManager && scene._trackManager._tracks)
      this.translate(scene._trackManager._tracks)
  }

  translate(dialogList) {
    // Show raw texts in JSON form for data extraction
    let showRaws = {
      // notes: [
      //   'Only translate from "jp" -> "tl". Untranslated character names are to be added separately.',
      // ],
      messages: dialogList.filter(v=>!!v.text).map(dialog => {
        return {
          ch: this.translations[dialog.speaker] || dialog.speaker,
          jp: dialog.text,
          tl: ''
        }
      })
    }
    console.log(JSON.stringify(showRaws))

    // Translate the full dialog event
    return dialogList.map(dialog => {
      // Translate speakr
      if (dialog.speaker) {
        if (this.translations[dialog.speaker]) {
          dialog.speaker = this.translations[dialog.speaker]
        } else {
          console.log(dialog.speaker)
          // dialog.speaker = '+' + dialog.speaker + '+'
        }
      }
      // Translate message
      if (dialog.text) {
        if (this.translations[dialog.text]) {
          dialog.text = this.translations[dialog.text]
        } else {
          console.log(dialog.text)
          // dialog.text = '+' + dialog.text + '+'
        }
      }
    })
  }

}

export default Dialog
