import { GameMap } from './GameMap'
import { Hero } from './display/Hero'
import { Enemy } from './display/Enemy'
import { socket } from './socket'

var requestObject = {
    x: 0,
    y: 0,
}

function Game(gameCanvas, userName) {
    this._gameCanvas = gameCanvas
    this._name = userName
    this.update = this.update.bind(this)
    this.onMouseDown = this.onMouseDown.bind(this)
    this._enemies = {}
    this._ctx = gameCanvas.getContext('2d')

    this._mouseDown = false
    gameCanvas.addEventListener('mousedown', this.onMouseDown)
    document.addEventListener('mouseup', this.onMouseUp)
}

Game.prototype.init = function () {
    this._hero = new Hero()
    this._map = new GameMap()
}

Game.prototype.onMouseDown = function () {
    this._mouseDown = true
}
Game.prototype.onMouseUp = function () {
    this._mouseDown = false
}

Game.prototype.start = function () {

    socket.on('UPDATE', (positions) => {
        this._enemies = {}

        for (let i = 0; i < positions.length; i++) {
            var position = positions[i];

            if (position.type === 0) {
                if (position.name === this._name) {
                    this._hero.setPosition(position.x, position.y)
                } else {
                    var enemies = this._enemies
                    if (enemies[position.name] === undefined) {
                        enemies[position.name] = new Enemy()
                    }
                    enemies[position.name].setPosition(position.x, position.y)
                }
            }

        }

    })

    this.update()
}



Game.prototype.update = function () {
    var ctx = this._ctx
    this._map.draw(ctx)
    var enemies = this._enemies
    for (var key in enemies) {
        var enemy = enemies[key]
        enemy.draw(ctx)
    }

    this._hero.draw(ctx)

    requestObject.x = this._hero.getMoveX()
    requestObject.y = this._hero.getMoveY()
    requestObject.md = this._mouseDown
    socket.emit('USER', requestObject)

    requestAnimationFrame(this.update)
}

export { Game }