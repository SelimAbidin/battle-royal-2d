import { GameMap } from './GameMap'
import { Hero } from './display/Hero'
import { Enemy } from './display/Enemy'
import { Bullet } from './display/Bullet'
import { socket } from './socket'
import { PLAYER } from '../types'
import { Camera } from './display/Camera';

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
    this._camera = new Camera()
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

        var positions = data.p
        var bullets = data.b
        this._enemies.length = 0
        this._bullets.length = 0

        for (var i = 0; i < positions.length; i++) {
            var position = positions[i];
            if (position.name === this._name) {
                this._hero.setPosition(position.x, position.y)
            } else {
                var enemy = new Enemy()
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



var camX = 0

Game.prototype.update = function () {
    var ctx = this._ctx
    ctx.clearRect(0, 0, 700, 700)
    this._map.draw(this._camera, ctx)

    this._camera.setPosition(this._hero.getX() - 350, this._hero.getY() - 350)

    requestObject.x = this._hero.getMoveX()
    requestObject.y = this._hero.getMoveY()
    requestObject.md = this._mouseDown
    socket.emit('USER', requestObject)



    for (let i = 0; i < this._enemies.length; i++) {
        var enemy = this._enemies[i];
        enemy.draw(this._camera, ctx)
    }

    for (let i = 0; i < this._bullets.length; i++) {
        var bullet = this._bullets[i];
        bullet.draw(this._camera, ctx)
    }


    this._hero.draw(this._camera, ctx)

    requestAnimationFrame(this.update)
    return










    setTimeout(this.update, 1000)
}

export { Game }