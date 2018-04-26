const dot = require('dot-object')
const req = require.context('./', true, /^\.\/ui\/((?!jp).)*\/(.*)(.png)$/)

let images = {}

req.keys().forEach(path => {
  let assetPath = path.substring(5).split('/')
  if (!images[assetPath[0]]) images[assetPath[0]] = {}
  let filename = assetPath[1].split('.')
  images[assetPath[0]][filename[0]] = req(path)
})

module.exports = images
