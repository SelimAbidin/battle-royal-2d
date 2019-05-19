const { BULLET } = require('../types')
const { Player } = require('./player')
const { ClearArea } = require('./clearArea')
const { CENTER } = require('../common/map')

class Bullet {
    constructor(x, y, targetX, targetY) {
        this._x = x
        this._y = y
        this._targetX = targetX
        this._targetY = targetY
        this._time = 0
        this._isDead = false
    }

    isDead() {
        return this._isDead
    }

    update(deltaTime) {

        this._time += deltaTime
        if (this._time > 0.5) {
            this._isDead = true
        }

    }

    serialize() {

        // TODO with ID matching could be much usefull. Client could cache it.
        return {
            x: this._x,
            y: this._y,
            t: this._time,
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
        this._isOver = false
    }

    addUser(player) {
        this._users.push(player)
        player.socket.on('disconnect', () => this.removeUser(player))
    }

    removeUser(player) {
        this._users.splice(this._users.indexOf(player), 1)
    }

    addBullet(bulletModel) {
        this._bullets.push(new Bullet(bulletModel.x, bulletModel.y, bulletModel.targetX, bulletModel.targetY))
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
                i--
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