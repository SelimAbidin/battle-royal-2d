import {Sprite} from './display/Sprite'
import {AssetsManager} from './AssetsManager'
var _map = [
    [1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1],
]


function GameMap() {
    this._sprites = []
    this.init()
}

GameMap.prototype.init = function () {
    
    for (let i = 0; i < _map.length; i++) {
        let row = _map[i]
        for (let j = 0; j < row.length; j++) {
            let terrainType = row[j]
            let drawable = AssetsManager.getDrawableByKey(terrainType)
            let sprite = new Sprite(drawable)
            this._sprites.push(sprite)
        }
    }


}

GameMap.prototype.draw = function (context) {
    for (let i = 0; i < this._sprites.length; i++) {
        const sprite = this._sprites[i];
        sprite.draw(context)
    }
}

export {GameMap}