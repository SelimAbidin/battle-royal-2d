
const { SIZE } = require('../common/map')

class ClearArea {

    constructor(radius) {
        this._radius = radius
        this._nextArea = radius
        this.x = parseInt(Math.random() * SIZE.x, 10)
        this.y = parseInt(Math.random() * SIZE.y, 10)
        this._onTimerToShirink = this._onTimerToShirink.bind(this)
        this._interval = setInterval(this._onTimerToShirink, 25000)
    }

    _onTimerToShirink() {
        // this._nextArea -= 1000
    }

    getRadius() {
        return this._radius
    }

    isInside(player) {
        let dx = player._x - this.x
        let dy = player._y - this.y
        return Math.sqrt(dx * dx + dy * dy) < this._radius
    }

    update(deltaTme) {

        if (this._radius > this._nextArea) {
            this._radius -= deltaTme * 120
        } else {
            this._radius = this._nextArea
        }

        if (this._radius <= 0) {
            // this._isOver = true
            this._radius = 0
            return
        }
    }
}

module.exports = {
    ClearArea
}