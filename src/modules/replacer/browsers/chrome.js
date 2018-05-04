
export default function(images) {
  const FILTER = { urls: [ '*://shinycolors.enza.fun/assets/*' ] }
  const OPTIONS = [ 'blocking' ]

  let onBeforeRequest = function(details) {
    let replacementImage = getReplacementImage(details.url)
    if (!replacementImage) return null
    return { redirectUrl: replacementImage }
  }

  let getReplacementImage = function(url) {
    let assetHash = url.split('/').pop()
    return images[assetHash] || null
  }

  chrome.webRequest.onBeforeRequest.addListener(onBeforeRequest, FILTER, OPTIONS)
}
