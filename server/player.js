
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
        // this._speed = 500
        this._speed = 0.5
        this._friction = 0.95
        this._type = PLAYER
        this._socket = socket
        this._isMouseDown = false
        this._fireCount = fireTime
        this._tempPos = {}

        // this._xSpeed = 0
        // this._ySpeed = 0

        this._xRoute = 0
        this._yRoute = 0

        this._messageReceive = this._messageReceive.bind(this)
        socket.on('USER', this._messageReceive)
    }

    get socket() {
        return this._socket
    }

    _messageReceive(message) {

        this._xRoute = message.x
        this._yRoute = message.y
        // if (message.x > 0) {
        //     // this._vx = this._speed * 2
        // } else if (message.x < 0) {
        //     this._vx = -this._speed * 2
        // }

        // if (message.y > 0) {
        //     this._vy = this._speed * 2
        // } else if (message.y < 0) {
        //     this._vy = -this._speed * 2
        // }

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
        let angle = Math.atan2(dy, dx)

        let vx = Math.cos(angle) * 1.5
        let vy = Math.sin(angle) * 1.5

        return {
            x: this._x,
            y: this._y,
            vx,
            vy
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
        // this._vx = 0
        // this._vy = 0
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