const { BULLET } = require('../types')
const { Player } = require('./player')
const { ClearArea } = require('./clearArea')
const { CENTER } = require('../common/map')

class Bullet {
    constructor(x, y, vx, vy, targetX, targetY) {
        this._x = x
        this._y = y
        this._vx = vx
        this._vy = vy
        this._targetX = targetX
        this._targetY = targetY

        let dx = targetX - x
        let dy = targetY - y

        // console.log("targetX", targetX);

        // console.log(this._targetX, this._targetY);
        // console.log(x, y);
        // console.log(x, y, targetX, targetY);


        this._fullDist = Math.sqrt(dx * dx + dy * dy)

        this._time = 0

        this._distRatio = 1
        this._isDead = false
        // this.kill = this.kill.bind(this)
        // setTimeout(this.kill, 1000)
    }

    // kill() {
    //     this._isDead = true
    // }

    isDead() {
        return this._isDead
    }

    update(deltaTime) {

        this._time += deltaTime
        if (this._time > 1500) {
            this.isDead = true
        }

        // this._x += this._vx * 600 * deltaTime
        // this._y += this._vy * 600 * deltaTime

        // let dx = this._x - this._targetX
        // let dy = this._y - this._targetY
        // let dist = Math.sqrt(dx * dx + dy * dy)
        // this._distRatio = 2 - (dist / this._fullDist)

        // if (dist <= 10) {
        //     this._isDead = true
        // }

    }

    serialize() {
        return {
            // x: this._x,
            // y: this._y,
            // dr: this._distRatio,
            x: this._x,
            y: this._y,
            tx: this._targetX,
            ty: this._targetY,
            type: BULLET,
        }
    }
}


class Game {

    constructor() {
        this._users = []
        this._bullets = []

        this._clearArea = new ClearArea(2000)

        // this._clearAreaRadius = 2000
        // this._nextArea = 2000
        // // this._onTimerToShirink = this._onTimerToShirink.bind(this)
        // this._interval = setInterval(this._onTimerToShirink, 25000)
        this._isOver = false
    }

    // _onTimerToShirink() {
    //     // this._nextArea -= 1000
    // }

    addUser(player) {
        this._users.push(player)
        player.socket.on('disconnect', () => this.removeUser(player))
    }

    removeUser(player) {
        this._users.splice(this._users.indexOf(player), 1)
    }

    addBullet(bulletModel) {
        this._bullets.push(new Bullet(bulletModel.x, bulletModel.y, bulletModel.vx, bulletModel.vy, bulletModel.targetX, bulletModel.targetY))
    }

    isOver() {
        return this._isOver
    }

    update(deltaTme) {

        this._clearArea.update(deltaTme)

        for (let i = 0; i < this._bullets.length; i++) {
            const bullet = this._bullets[i];
            if (bullet.isDead()) {
                this._bullets.splice(i, 1)
                continue
            }
            bullet.update(deltaTme)
        }


        for (let i = 0; i < this._users.length; i++) {
            const user = this._users[i];
            user.update(deltaTme)

            if (!this._clearArea.isInside(user)) {
                user.damage(deltaTme)
            }

            if (user instanceof Player) {
                if (user.needsToFire()) {
                    let bulletModel = user.createBullet()
                    if (bulletModel) {
                        this.addBullet(bulletModel)
                    }
                }
            }
        }
    }

    serialize() {
        return {
            f: { r: this._clearArea.getRadius(), x: this._clearArea.x, y: this._clearArea.y },
            p: this._users.map(player => player.serialize()),
            b: this._bullets.map(bullet => bullet.serialize()),
        }
    }

}


module.exports = {
    Game
}