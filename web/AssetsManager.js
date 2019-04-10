

var assets = {}

function AssetsManager() {
    throw new Error('AssetsManager cannot be instanced')
}

function onload(params) {
    
}


AssetsManager.addImage = function (key, assetPath) {
    var image = new Image()
    image.onload = onload
    image.src = assetPath
    assets[key] =  image
}


AssetsManager.getDrawableByKey = function (key) {
    if(typeof key === 'string') {
        throw new TypeError("Type should be a string")
    }
    return assets[key]
}


export {AssetsManager}