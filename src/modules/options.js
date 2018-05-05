import ReplacerOptions from './replacer/meta.json'
import DialogOptions from './dialog/meta.json'

export default {
  global: {
    name: 'global',
    description: 'Settings that may apply across multiple modules',
    // Keep the options array JSON-syntax as possible for easier portability
    options: [
      {
        "id": "lang",
        "title": "Language",
        "desc": "Desired language for texts in both hiori app, and in-game",
        "type": "dropdown",
        "default": "en_us",
        "data": [
          {
            "name": "English",
            "value": "en_us"
          },
          {
            "name": "Korean",
            "value": "ko_kr"
          }
        ]
      }
    ]
  },
  replacer: ReplacerOptions,
  dialog: DialogOptions
}
