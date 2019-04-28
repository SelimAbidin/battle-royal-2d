const { BULLET } = require('../types')
const { Player } = require('./player')

class Bullet {
    constructor(x, y, vx, vy) {
        this._x = x
        this._y = y
        this._vx = vx
        this._vy = vy
    }

    inBound(boundBox) {

    }

    update(deltaTime) {
        this._x += (this._vx * 300) * deltaTime
        this._y += (this._vy * 300) * deltaTime
    }

    serialize() {
        return {
            x: this._x,
            y: this._y,
            type: BULLET,
        }
    }
}


class Game {

    constructor() {
        this._users = []
        this._bullets = []
    }

    addUser(player) {
        this._users.push(player)
        player.socket.on('disconnect', () => this.removeUser(player))
    }

    removeUser(player) {
        this._users.splice(this._users.indexOf(player), 1)
    }

    addBullet(bulletModel) {
        this._bullets.push(new Bullet(bulletModel.x, bulletModel.y, bulletModel.vx, bulletModel.vy))
    }

    update(deltaTme) {

        for (let i = 0; i < this._bullets.length; i++) {
            const bullet = this._bullets[i];
            bullet.update(deltaTme)
        }


        for (let i = 0; i < this._users.length; i++) {
            const user = this._users[i];
            user.update(deltaTme)
            if (user instanceof Player) {

                if (user.needsToFire()) {
                    let bulletModel = user.createBullet()
                    this.addBullet(bulletModel)
                }
            }
        }
    }

    serialize() {
        return {
            p: this._users.map(player => player.serialize()),
            b: this._bullets.map(bullet => bullet.serialize()),
        }
    }

}


module.exports = {
    Game
}