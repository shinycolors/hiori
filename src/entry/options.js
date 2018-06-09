import HioriSDK from '@sdk'
import modules from '@modules/options.js'
import Vue from 'vue'
import OptionsPage from '@components/OptionsPage.vue'

class OptionsEntry extends HioriSDK.Entry {

  start() {
    console.log('! options !', modules)
    window.addEventListener('load', function(event) {
      let appDiv = document.createElement('div')
      appDiv.id = 'app'
      document.body.appendChild(appDiv)

      let app = new Vue({
        el: '#app',
        render: h => h(OptionsPage, {
          props: {
            modules: modules
          }
        })
      })

    })
  }

}

let main = new OptionsEntry()
main.start()
