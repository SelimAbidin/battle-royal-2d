import { Sprite } from './display/Sprite'
import { AssetsManager } from './AssetsManager'
import { mat3 } from 'gl-matrix'
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
    for (var i = 0; i < this._sprites.length; i++) {
        const sprite = this._sprites[i];
        sprite.draw(camera, context)
    }
}

export { GameMap }