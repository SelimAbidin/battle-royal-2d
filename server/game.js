

class Game {

    constructor() {
        this._users = []
    }

    addUser(player) {
        this._users.push(player)
        player.socket.on('disconnect', () => this.removeUser(player))
    }

    removeUser(player) {
        this._users.splice(this._users.indexOf(player), 1)
    }


    update() {
        for (let i = 0; i < this._users.length; i++) {
            const user = this._users[i];
            user.update()
        }
    }

    serialize() {
        return this._users.map(player => player.serialize())
    }

}


module.exports = {
    Game
}