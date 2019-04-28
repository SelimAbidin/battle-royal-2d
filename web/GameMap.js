import { Sprite } from './display/Sprite'
import { AssetsManager } from './AssetsManager'
var _map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
]

// var size = 500 / _map[0].length
var size = 500
function GameMap() {
    this._sprites = []
    this.init()
}

GameMap.prototype.init = function () {
    for (var i = 0; i < _map.length; i++) {
        var row = _map[i]
        for (var j = 0; j < row.length; j++) {
            var terrainType = row[j]
            var drawable = AssetsManager.getDrawableByKey(terrainType)
            var sprite = new Sprite(drawable)
            sprite.setSize(size, size)
            sprite.setPosition(i * size, j * size)
            this._sprites.push(sprite)
        }
    }
}

GameMap.prototype.draw = function (camera, context) {

    // camera

    // var left = camera.getBoundLeft()

    for (var i = 0; i < this._sprites.length; i++) {
        const sprite = this._sprites[i];
        // no need view matrix
        // var x = sprite.getX() - left
        // sprite.modelViewMatrix
        sprite.setViewMatrix(x)
        var x = 11
        sprite.draw(context)
    }
}

export { GameMap }