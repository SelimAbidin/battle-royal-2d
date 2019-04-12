import { GameMap } from './GameMap'
import { Sprite } from './display/Sprite';
import { AssetsManager } from './AssetsManager';

var heroKeys = ["angel"]

function Game(gameCanvas) {
    this._gameCanvas = gameCanvas
    this.update = this.update.bind(this)
    this._ctx = gameCanvas.getContext('2d')
}

Game.prototype.init = function () {
    var heroKey = heroKeys[0]
    this._hero = new Sprite(AssetsManager.getDrawableByKey(heroKey))
    this._hero.setSize(40, 40)
    this._map = new GameMap()
}

Game.prototype.start = function () {
    this.update()
}

Game.prototype.update = function () {
    var ctx = this._ctx
    this._map.draw(ctx)
    this._hero.draw(ctx)
    requestAnimationFrame(this.update)
}

export { Game }