// import ModuleReplacer from './modules/replacer/background'
//
//
// ModuleReplacer.backgroundScript()
//
// // const replacementImage = chrome.runtime.getURL('img/buttons.png')
// const replacementImage = buttonsBase64
//
// // const targetImage = 'https://avatars3.githubusercontent.com/u/557312?s=60&v=4'
// const targetImage = '*://shinycolors.enza.fun/assets/4de32a008aefb569637d432ae95156ad0104980ae1403a23f017627048fb8e83'
//
// let handler = details => {
//   return { redirectUrl: replacementImage }
// }
// let filter = { urls: [targetImage] }
// let opts = [ 'blocking' ]
//
// chrome.webRequest.onBeforeRequest.addListener(replacer, filter, opts)
//
// import modules from './modules'
import sdk from '@sdk'
import modules from '@modules'

console.log('sdk', sdk)
console.log('modules', modules)
