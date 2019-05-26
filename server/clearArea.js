
const { SIZE, CENTER } = require('../common/map')

const SHIRINK_TIME = 15 * 1000
class ClearArea {

    constructor(radius) {
        this._radius = radius
        this._nextArea = radius

        let width = SIZE.x * 0.6
        let height = SIZE.y * 0.6
        let x = CENTER.x + ((Math.random() * width) - (width / 2))
        let y = CENTER.y + ((Math.random() * height) - (height / 2))

        // console.log(x, y);

        this.x = parseInt(x, 10)
        this.y = parseInt(y, 10)

        this._onTimerToShirink = this._onTimerToShirink.bind(this)
        this._interval = setTimeout(this._onTimerToShirink, SHIRINK_TIME)
    }

    _onTimerToShirink() {
        this._nextArea -= 1000
        this._interval = null
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
            this._radius -= deltaTme * 150
        } else {

            if (this._interval === null) {
                this._interval = setTimeout(this._onTimerToShirink, SHIRINK_TIME)
            }

            this._radius = this._nextArea
        }

        if (this._radius <= 0) {
            this._radius = 0
            return
        }
    }
}

module.exports = {
    ClearArea
}