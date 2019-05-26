import { Sprite } from './display/Sprite'
import { AssetsManager } from './AssetsManager'
import { mat3 } from 'gl-matrix'
import { MAP as _map, TILE_SIZE } from '../common/map'
// var size = 500 / _map[0].length
function GameMap() {
    this._sprites = []
    this.init()
}

GameMap.prototype.init = function () {

    var tileSize = TILE_SIZE
    var half = tileSize * 0.5
    for (var i = 0; i < _map.length; i++) {
        var row = _map[i]
        for (var j = 0; j < row.length; j++) {
            var terrainType = row[j]
            var drawable = AssetsManager.getDrawableByKey(terrainType)
            var sprite = new Sprite(drawable)
            sprite.setSize(tileSize + 1, tileSize + 1)
            sprite.setPosition(half + (i * tileSize), half + (j * tileSize))
            this._sprites.push(sprite)
        }
    }
}

GameMap.prototype.draw = function (camera, context) {
    for (var i = 0; i < this._sprites.length; i++) {
        var sprite = this._sprites[i];
        sprite.draw(camera, context)
    }
}

export { GameMap }