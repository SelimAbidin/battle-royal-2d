import { GameMap } from './GameMap'
import { Hero } from './display/Hero'
import { Enemy } from './display/Enemy'
import { Bullet } from './display/Bullet'
import { socket } from './socket'
import { PLAYER } from '../types'

var requestObject = {
    x: 0,
    y: 0,
    md: false, // mouse down
}

function Game(gameCanvas, userName) {
    this._gameCanvas = gameCanvas
    this._name = userName
    this.update = this.update.bind(this)
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this._enemies = []
    this._bullets = []
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

    socket.on('UPDATE', (data) => {

        let positions = data.p
        let bullets = data.b
        this._enemies.length = 0
        this._bullets.length = 0

        for (let i = 0; i < positions.length; i++) {
            var position = positions[i];
            if (position.name === this._name) {
                this._hero.setPosition(position.x, position.y)
            } else {
                let enemy = new Enemy()
                enemy.setPosition(position.x, position.y)
                this._enemies.push(enemy)
            }
        }

        for (let i = 0; i < bullets.length; i++) {
            var bullet = bullets[i];
            let b = new Bullet()
            b.setPosition(bullet.x, bullet.y)

            this._bullets.push(b)
        }

    })

    this.update()
}



Game.prototype.update = function () {
    var ctx = this._ctx
    this._map.draw(ctx)
    var enemies = this._enemies

    for (let i = 0; i < this._enemies.length; i++) {
        var enemy = this._enemies[i];
        enemy.draw(ctx)
    }

    this._hero.draw(ctx)


    for (let i = 0; i < this._bullets.length; i++) {
        var bullet = this._bullets[i];
        bullet.draw(ctx)
    }


    requestObject.x = this._hero.getMoveX()
    requestObject.y = this._hero.getMoveY()
    requestObject.md = this._mouseDown

    console.log(requestObject.md);

    socket.emit('USER', requestObject)

    requestAnimationFrame(this.update)
}

export { Game }