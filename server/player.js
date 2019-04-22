
const { PLAYER } = require('../types')


let fireTime = 1
class Player {
    constructor(id, name, socket) {
        this._id = id
        this._name = name
        this._x = 0
        this._y = 0
        this._vx = 0
        this._vy = 0
        this._speed = 50
        this._type = PLAYER
        this._socket = socket
        this._isMouseDown = false
        this._fireCount = fireTime
        this._messageReceive = this._messageReceive.bind(this)
        socket.on('USER', this._messageReceive)
    }

    get socket() {
        return this._socket
    }

    _messageReceive(message) {

        if (message.x > 0) {
            this._vx = this._speed * 2
        } else if (message.x < 0) {
            this._vx = -this._speed * 2
        }

        if (message.y > 0) {
            this._vy = this._speed * 2
        } else if (message.y < 0) {
            this._vy = -this._speed * 2
        }

        this._isMouseDown = message.md

    }

    needsToFire() {
        return this._isMouseDown && this._fireCount > fireTime
    }

    createBullet() {
        this._fireCount = 0
        return {
            x: this._x,
            y: this._y,
            vx: 0.5,
            vy: 0.5
        }
    }

    update(deltaTime) {
        this._fireCount += deltaTime
        this.setPosition(this._x + this._vx * deltaTime, this._y + this._vy * deltaTime)
        this._vx = 0
        this._vy = 0
    }

    setPosition(x, y) {
        this._x = x
        this._y = y
    }

    serialize() {
        return {
            x: this._x,
            y: this._y,
            name: this._name,
            type: this._type,
        }
    }


}


module.exports = {
    Player
}