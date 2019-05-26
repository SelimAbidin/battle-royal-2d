

var assets = {}
var _callbacks = []
function AssetsManager() {
    throw new Error('AssetsManager cannot be instanced')
}

function onload() {
    var hasNonFinished = false
    for (const key in assets) {
        var asset = assets[key]
        if (!asset.ready) {
            hasNonFinished = true
            break
        }
    }

    if (!hasNonFinished) {
        for (var i = 0; i < _callbacks.length; i++) {
            _callbacks[i]()
        }
        _callbacks.length = 0
    }
}

AssetsManager.addImage = function (key, assetPath) {
    var image = new Image()
    var asset = {
        image: image,
        ready: false
    }
    image.onload = function (event) {
        var image = event.currentTarget
        asset.width = image.width
        asset.height = image.height
        asset.ready = true
        asset.key = key
        onload(asset)
    }
    assets[key] = asset
    image.src = assetPath
}

AssetsManager.onReady = function (callBack) {
    _callbacks.push(callBack)
}

AssetsManager.getDrawableByKey = function (key) {
    return assets[key]
}


export { AssetsManager }