

var assets = {}

function AssetsManager() {
    throw new Error('AssetsManager cannot be instanced')
}

function onload(params) {
    
}

AssetsManager.addImage = function (key, assetPath) {
    var image = new Image()
    var asset =  {
        image:image,
    }
    image.onload = function (event) {
        let image = event.currentTarget
        asset.width = image.width
        asset.height = image.height
        onload(asset)
    }
    image.src = assetPath
    assets[key] = asset
}

AssetsManager.getDrawableByKey = function (key) {
    if(typeof key === 'string') {
        throw new TypeError("Type should be a string")
    }
    return assets[key]
}


export {AssetsManager}