/**
 * original firefon implementaion by senior9324
 * https://gist.github.com/senior9324/6fe63ad2b1516c6e96ff833ecba68a4d
 */

export default function(images) {
  const FILTER = { urls: [ '*://shinycolors.enza.fun/assets/*' ] }
  const OPTIONS = [ 'blocking' ]

  let onBeforeRequest = function(details) {
    let replacementImage = getReplacementImage(details.url)
    if (replacementImage) {
      let filter = browser.webRequest.filterResponseData(details.requestId)
      filter.ondata = function (event) {
        let byteString = atob(replacementImage.split(',')[1])
        let ab = new ArrayBuffer(byteString.length)
        let ia = new Uint8Array(ab)
        for (var i = 0; i < byteString.length; i++) {
  			  ia[i] = byteString.charCodeAt(i)
  		  }
        filter.write(ia)
      }
      filter.onstop = event => { filter.close() }
    }
    return null
  }

  let getReplacementImage = function(url) {
    let assetHash = url.split('/').pop()
    return images[assetHash] || null
  }

  browser.webRequest.onBeforeRequest.addListener(onBeforeRequest, FILTER, OPTIONS)
}
