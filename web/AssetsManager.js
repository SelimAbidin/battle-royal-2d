

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


export {AssetsManager}