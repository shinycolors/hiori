import modules from '@modules'

console.info('! content script !')

Object.keys(modules).forEach(moduleName => {
  if (modules[moduleName].content) {
    let module = new modules[moduleName].content
    module.run()
  }
})

window.addEventListener('load', function(event) {
  let injects = document.createElement('script')
  injects.src = chrome.extension.getURL('injects.js')
  document.body.appendChild(injects)
})
