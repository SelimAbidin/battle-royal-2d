const { BULLET } = require('../types')
const { Player } = require('./player')
const { ClearArea } = require('./clearArea')
const { CENTER } = require('../common/map')
const { inWalkable } = require('./map-collision')


const PLAYER_WAITING_TIME = 5

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
        if (this._time > 1.0) {
            this._isDead = true
        }
    }

    getTargetX() {
        return this._targetX
    }

    getTargetY() {
        return this._targetY
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

const STATUS = {
    WAITING_PLAYERS: 0,
    PLAYING: 1,
}

class Game {

    constructor() {
        this._users = []
        this._bullets = []
        this._explotions = []
        this._clearArea = new ClearArea(5000)
        this._isOver = false
        this._statusTimer = 0

        console.log("new game");

        this.setStatus(STATUS.WAITING_PLAYERS)
    }

    isWaitingForPlayer() {
        return this._gameStatus === STATUS.WAITING_PLAYERS
    }

    setStatus(status) {

        if (this._gameStatus !== status) {
            this._gameStatus = status
            if (status === STATUS.WAITING_PLAYERS) {
                this._allowCollision = false
                this._statusTimer = Date.now()
                setTimeout(e => this.setStatus(STATUS.PLAYING), PLAYER_WAITING_TIME * 1000)
            } else if (status === STATUS.PLAYING) {
                this._users.forEach(user => {

                    let placed = false
                    let safe = 0
                    while (!placed) {
                        let cx = this._clearArea.x
                        let cy = this._clearArea.y
                        let radius = this._clearArea.getRadius() / 2
                        let x = cx + Math.random() * radius
                        let y = cy + Math.random() * radius
                        user.setPosition(x, y)
                        placed = inWalkable(x, y)
                        if (++safe > 100) {
                            break
                        }
                    }

                })
                this._allowCollision = true
            }
        }

    }

    getStatus() {
        return this._gameStatus
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
        let status = this._gameStatus
        return this._users.length < 2 && status === STATUS.PLAYING
    }

    getWinner() {
        return this._winner
    }

    updateBullets(deltaTme) {

        this._explotions.length = 0
        for (let i = 0; i < this._bullets.length; i++) {
            const bullet = this._bullets[i];
            if (bullet.isDead()) {
                this._explotions.push(bullet)
                this._bullets.splice(i, 1)
                i--
                continue
            }
            bullet.update(deltaTme)
        }
    }

    updateUsers(deltaTme) {
        for (let i = 0; i < this._users.length; i++) {
            const user = this._users[i];
            user.update(deltaTme)
            if (user instanceof Player) {
                if (user.needsToFire()) {
                    let bulletModel = user.createBullet()
                    if (bulletModel) {
                        this.addBullet(bulletModel)
                    }
                }
            }

            // I know I check this before collision
            // And I know when they die in same time, second will be alive
            if (user.isDead()) {
                this._users.splice(i, 1)
                i--
            }
        }


    }

    collisionCheck(deltaTme) {
        for (let i = 0; i < this._users.length; i++) {
            const user = this._users[i];
            if (!this._clearArea.isInside(user)) {
                user.damage(deltaTme)
            }
        }

        for (let i = 0; i < this._users.length; i++) {
            let user = this._users[i]
            for (let j = 0; j < this._explotions.length; j++) {
                const explotion = this._explotions[j];
                let dx = explotion.getTargetX() - user.getX()
                let dy = explotion.getTargetY() - user.getY()
                let dist = Math.sqrt(dx * dx + dy * dy)
                if (dist < 55) {
                    let damage = (1 - (dist / 55)) * 100
                    user.damage(damage)
                } else {

                }
            }
        }
    }

    update(deltaTme) {

        this._clearArea.update(deltaTme)

        this.updateBullets(deltaTme)
        this.updateUsers(deltaTme)

        if (this._allowCollision) {
            this.collisionCheck(deltaTme)
        }

        if (this.getStatus() === STATUS.PLAYING) {
            if (this._users.length === 1) {
                this._winner = this._users[0].name
            } else {

            }
        }
    }

    serialize() {

        let status = this.getStatus()
        let data = {
            f: { r: this._clearArea.getRadius(), x: this._clearArea.x, y: this._clearArea.y },
            p: this._users.map(player => player.serialize()),
            b: this._bullets.map(bullet => bullet.serialize()),
            e: this._explotions.map(explotion => ({ x: explotion.getTargetX(), y: explotion.getTargetY() }))
        }

        if (status === STATUS.WAITING_PLAYERS) {
            data.s = STATUS.WAITING_PLAYERS
            data.t = Date.now() - this._statusTimer
        }
        return data
    }

}


module.exports = {
    Game
}