import { GameMap } from './GameMap'
import { Hero } from './display/Hero'
import { Enemy } from './display/Enemy'
import { Bullet } from './display/Bullet'
import { socket } from './socket'
import { Camera } from './display/Camera';
import { Fog } from './display/Fog';
import { SIZE, CENTER } from '../common/map';
import { DropArea } from './display/DropArea';
import { Explosion } from './display/Explosion';

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
    this._drops = []
    this._explosions = []
    this._explosionPoints = []
    this._ctx = gameCanvas.getContext('2d')
    this._camera = new Camera()
    this._mouseDown = false

    socket.on('MESSAGE', (e) => {

        if (e.s === 3) {
            this._text = e.t
        }

    })
}

Game.prototype.init = function () {
    this._gameCanvas.addEventListener('mousedown', this.onMouseDown)
    document.addEventListener('mouseup', this.onMouseUp)
    document.addEventListener('mousemove', this.onMouseMove)

    this._frame = {
        deltaTime: 0,
        context: this._ctx
    }

    this._hero = new Hero(this._name)
    this._map = new GameMap()
    this._fog = new Fog(CENTER, Math.max(SIZE.x, SIZE.y) * 2)
}

Game.prototype.onMouseMove = function (e) {
    this._mousePosition = {
        x: e.offsetX,
        y: e.offsetY,
    }
}

Game.prototype.onMouseDown = function () {
    this._mouseDown = true
    this._hero.startAmmowLoad()
}
Game.prototype.onMouseUp = function () {
    this._mouseDown = false
    this._hero.releaseAmmo()
}

var deltaTimeTemp
Game.prototype.start = function () {

    socket.on('UPDATE', (data) => {

        if (data.s === 0) {
            this._text = "WAITING FOR PLAYERS (" + (30 - Math.round(data.t / 1000)) + ")"
        } else {
            this._text = undefined
        }

        var positions = data.p
        var bullets = data.b
        var explosions = data.e
        var fog = data.f
        this._enemies.length = 0
        this._bullets.length = 0
        this._drops.length = 0



        for (var i = 0; i < positions.length; i++) {
            var position = positions[i];
            if (position.name === this._name) {
                this._hero.setPosition(position.x, position.y)
                this._hero.setLife(position.life)
                this._camera.followObject(this._hero)
            } else {
                var enemy = new Enemy(position.name)
                enemy.setPosition(position.x, position.y)
                this._enemies.push(enemy)
            }
        }

        if (this.isObserver) {
            this._camera.followObject(this._enemies[0])
        } else {

        }


        for (var i = 0; i < bullets.length; i++) {
            var bullet = bullets[i];
            var b = new Bullet(bullet)
            var drop = new DropArea()
            drop.setPosition(bullet.tx, bullet.ty)
            this._bullets.push(b)
            this._drops.push(drop)
        }


        for (var index = 0; index < explosions.length; index++) {
            const model = explosions[index];
            var explosion = new Explosion()
            explosion.setPosition(model.x, model.y)
            this._explosions.push(explosion)
            this._explosionPoints.push(model)
        }

        this._fog.setPosition(fog.x, fog.y)
        this._fog.setRadius(fog.r)
    })

    deltaTimeTemp = Date.now() - 16
    this.update()
}


Game.prototype.renderGUI = function (ctx) {

    ctx.font = "bold 25px Arial";
    ctx.fillStyle = "#00FF00";
    ctx.textAlign = "left";
    ctx.fillText('Life :' + Math.ceil(this._hero.getLife()), 10, 30);


    if (this._text !== undefined) {
        ctx.font = "bold 35px Arial";
        ctx.fillStyle = "#00FF00";
        ctx.textAlign = "center";
        ctx.fillText(this._text, 350, 350);
    }
}


Game.prototype.update = function () {

    this._frame.deltaTime = Date.now() - deltaTimeTemp

    var ctx = this._ctx
    ctx.clearRect(0, 0, 700, 700)


    this._camera.begin(ctx)

    while (this._explosionPoints.length > 0) {
        var explotion = this._explosionPoints.shift()
        this._camera.shakeByDistance(explotion.x - 350, explotion.y - 350)
    }

    this._camera.update(this._frame)
    this._map.draw(ctx)

    for (var i = 0; i < this._drops.length; i++) {
        var drop = this._drops[i];
        drop.draw(ctx)
    }

    for (var i = 0; i < this._enemies.length; i++) {
        var enemy = this._enemies[i];
        enemy.draw(ctx)
    }

    this._hero.draw(ctx)

    for (var i = 0; i < this._bullets.length; i++) {
        var bullet = this._bullets[i];
        bullet.draw(ctx)
    }


    for (var i = 0; i < this._explosions.length; i++) {
        const explosion = this._explosions[i];
        explosion.update(this._frame)
        explosion.draw(ctx)
        if (explosion.isDead()) {
            this._explosions.splice(i, 1)
            i--
        }
    }

    this._fog.draw(ctx)
    this._camera.end(ctx)

    this.renderGUI(ctx)

    if (this._hero instanceof Hero) {
        requestObject.x = this._hero.getMoveX()
        requestObject.y = this._hero.getMoveY()
        requestObject.md = this._mouseDown
        requestObject.mp = this._mousePosition
        socket.emit('USER', requestObject)
    }

    deltaTimeTemp = Date.now()

    requestAnimationFrame(this.update)
}

export { Game }