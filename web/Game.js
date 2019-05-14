import { GameMap } from './GameMap'
import { Hero } from './display/Hero'
import { Enemy } from './display/Enemy'
import { Bullet } from './display/Bullet'
import { socket } from './socket'
import { PLAYER } from '../types'
import { Camera } from './display/Camera';
import { Fog } from './display/Fog';
import { SIZE, CENTER } from '../common/map';

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
    this.onMouseMove = this.onMouseMove.bind(this)
    this._enemies = []
    this._bullets = []
    this._ctx = gameCanvas.getContext('2d')
    this._camera = new Camera()
    this._mouseDown = false
    gameCanvas.addEventListener('mousedown', this.onMouseDown)
    document.addEventListener('mouseup', this.onMouseUp)
    document.addEventListener('mousemove', this.onMouseMove)
}

Game.prototype.init = function () {
    this._hero = new Hero(this._name)
    this._map = new GameMap()


    this._fog = new Fog(CENTER, Math.max(SIZE.x, SIZE.y))
}

Game.prototype.onMouseMove = function (e) {
    this._mousePosition = {
        x: e.offsetX,
        y: e.offsetY,
    }
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
        var fog = data.f
        this._enemies.length = 0
        this._bullets.length = 0

        for (var i = 0; i < positions.length; i++) {
            var position = positions[i];
            if (position.name === this._name) {
                this._hero.setPosition(position.x, position.y)
                this._hero.setLife(position.life)
            } else {
                var enemy = new Enemy(position.name)
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



        this._fog.setPosition(fog.x, fog.y)
        this._fog.setRadius(fog.r)
    })

    this.update()
}

window.cameraX = 0
Game.prototype.update = function () {
    var ctx = this._ctx
    ctx.translate(0.5, 0.5);

    ctx.clearRect(0, 0, 700, 700)


    let cameraX
    let cameraY
    if (this._hero.getX() < 350) {
        cameraX = 0
    } else if (this._hero.getX() > 4650) {
        cameraX = 4650 - 350
    } else {
        cameraX = this._hero.getX() - 350
    }

    if (this._hero.getY() < 350) {
        cameraY = 0
    } else if (this._hero.getY() > 4650) {
        cameraY = 4650 - 350
    } else {
        cameraY = this._hero.getY() - 350
    }

    this._camera.setPosition(cameraX, cameraY)


    this._map.draw(this._camera, ctx)

    requestObject.x = this._hero.getMoveX()
    requestObject.y = this._hero.getMoveY()
    requestObject.md = this._mouseDown
    requestObject.mp = this._mousePosition

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
    this._fog.draw(this._camera, ctx)


    ctx.font = "bold 25px Arial";
    ctx.fillStyle = "#00FF00";
    ctx.textAlign = "left";
    ctx.fillText('Life :' + Math.ceil(this._hero.getLife()), 10, 30);

    ctx.translate(-0.5, -0.5);

    requestAnimationFrame(this.update)
    return

    setTimeout(this.update, 1000)
}

export { Game }