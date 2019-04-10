import {GameMap} from './GameMap'

function Game(gameCanvas) {
    this._gameCanvas = gameCanvas
}


Game.prototype.init = function () {
    this._map = new GameMap()

}

export {Game}