import HioriSDK from '@sdk'
import Messages from './locale'

class Dialog extends HioriSDK.ContentScript {
  get name() { return 'dialog' }

  constructor() {
    super()
    if (!this.options.get('enabled')) return;
    this.lang = this.options.get('lang', 'global')
    this.lastScene = null
    this.lastCommID = null
    this.translations = null
    this.downloadLink = null
    this.events = []
  }

  run() {
    if (!this.options.get('enabled')) return;
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

    this.lastCommID = (scene._event ? scene._event.id : this.lastCommID)

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

    // Character reactions (template)
    /*if (scene._mainLayer &&
        scene._mainLayer._topLayer &&
        scene._mainLayer._topLayer._topCharacterReaction)
      this.translateReactions(scene._mainLayer._topLayer._topCharacterReaction)*/
  }

  //translateReactions(characterData) {}

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
      }),

      choices: dialogList.filter(v=>!!v.select).map(choice => {
        return {
          jp: choice.select,
          tl: ''
        }
      })
    }

    // Create a blob containing the string-ified json as a UTF-8 json file and make it accesible as url
    let file = new Blob([JSON.stringify(showRaws, null, '\t')], {type: "application/json;charset=UTF-8"})
    let url = URL.createObjectURL(file)

    // If the download link element doens't exist, create it
    if ( !this.downloadLink )
      this.downloadLink = document.createElement("a")

    // [bugfix] Firefox can't click the element if it is not in the DOM
    document.body.appendChild(this.downloadLink)

    // Set the prefix to the commid OR the unique date
    let prefix = (!!this.lastCommID ? this.lastCommID : "unknownID")

    this.downloadLink.href = url
    this.downloadLink.download = commid + "_dialog_export.json"
    this.downloadLink.target = "_blank"

    // Create a keyboard shortcut handler to automate the click and download
    function kbDownHandler(e)
    {
      // Ctrl + Shift + D
      if ( e.ctrlKey == true && e.shiftKey == true && e.which == 68 )
      {
        // Remove all handlers, so the event doesn't fire twice and
        // previous non-saved commus don't replicate the event either
        let hdlr = null
        while ( hdlr = self.events.shift() )
        {
          document.removeEventListener("keydown", hdlr)
        }

        e.preventDefault()

        // Click and remove from DOM
        self.downloadLink.click()
        document.body.removeChild(self.downloadLink);
      }
    }

    // Listen to the keyboard event
    document.addEventListener("keydown", kbDownHandler)

    // Push the ev fn to the array
    this.events.push(kbDownHandler);

    console.log("\nTRANSLATORS/CONTRIBUTORS:\nPress Ctrl + Shift + D while focussing the game window to export the dialog file. Thanks :).\n\n")

    // Translate the full dialog event
    return dialogList.map(dialog => {
      // Translate speakr
      if (dialog.speaker) {
        if (this.translations[dialog.speaker]) {
          dialog.speaker = this.translations[dialog.speaker]
        }
      }

      // Translate message
      if (dialog.text) {
        if (this.translations[dialog.text]) {
          dialog.text = this.translations[dialog.text]
        }
      }

      // Translate choice
      if (dialog.select)
      {
        if (this.translations[dialog.select]) {
          dialog.select = this.translations[dialog.select]
        }
      }
    })
  }

}

export default Dialog
