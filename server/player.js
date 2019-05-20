
const { PLAYER } = require('../types')
const { lousyCollision } = require('./map-collision')

let fireTime = 1
class Player {
    constructor(id, name, socket) {
        this._id = id
        this._name = name
        this._x = 4640
        this._y = 0
        this._vx = 0
        this._vy = 0
        this._life = 100
        this._speed = 0.2
        this._friction = 0.95
        this._type = PLAYER
        this._socket = socket
        this._isMouseDown = false
        this._fireCount = fireTime
        this._tempPos = {}
        this._xRoute = 0
        this._yRoute = 0

        this._messageReceive = this._messageReceive.bind(this)
        socket.on('USER', this._messageReceive)
    }

    get socket() {
        return this._socket
    }

    getX() {
        return this._x
    }

    getY() {
        return this._y
    }

    _messageReceive(message) {
        this._xRoute = message.x
        this._yRoute = message.y
        this._isMouseDown = message.md
        this._mousePosition = message.mp
    }

    needsToFire() {
        return this._isMouseDown && this._fireCount > fireTime
    }

    createBullet() {

        if (!this._mousePosition) return

        this._fireCount = 0
        let dx = this._mousePosition.x - 350
        let dy = this._mousePosition.y - 350

        return {
            x: this._x,
            y: this._y,
            targetX: this._x + dx,
            targetY: this._y + dy,
        }
    }

    update(deltaTime) {

        this._fireCount += deltaTime

        if (this._xRoute === -1) {
            this._vx -= this._speed
        } else if (this._xRoute === 1) {
            this._vx += this._speed
        }

        if (this._yRoute === -1) {
            this._vy -= this._speed
        } else if (this._yRoute === 1) {
            this._vy += this._speed
        }


        this._vx *= this._friction
        this._vy *= this._friction

        lousyCollision(this._x,
            this._x + this._vx,
            this._y,
            this._y + this._vy,
            this._tempPos
        )
        this.setPosition(this._tempPos.x, this._tempPos.y)
    }

    damage(v) {
        this._life -= v
    }

    setPosition(x, y) {
        this._x = x
        this._y = y
    }

    serialize() {
        return {
            x: this._x,
            y: this._y,
            life: this._life,
            name: this._name,
            type: this._type,
        }
    }


}


module.exports = {
    Player
}