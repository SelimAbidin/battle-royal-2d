import { GameMap } from './GameMap'

function Game(gameCanvas) {
    this._gameCanvas = gameCanvas
    this.update = this.update.bind(this)
    this._ctx = gameCanvas.getContext('2d')
}


Game.prototype.init = function () {
    this._map = new GameMap()
}

Game.prototype.start = function () {
    this.update()
}




Game.prototype.update = function () {

    var ctx = this._ctx
    this._map.draw(ctx)
    requestAnimationFrame(this.update)
}

export { Game }