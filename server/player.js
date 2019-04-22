


class Player {
    constructor(id, name, socket) {
        this._id = id
        this._name = name
        this._x = 0
        this._y = 0
        this._type = 'PLAYER'
        this._socket = socket
        this._messageReceive = this._messageReceive.bind(this)
        socket.on('USER', this._messageReceive)
        // (e) => {
        //     let user = userMap[socket.id]
        //     if (!user) {
        //         return
        //     }
        //     if (e.x === -1) {
        //         user.x -= 1
        //     } else if (e.x === 1) {
        //         user.x += 1
        //     }
        //     if (e.y === -1) {
        //         user.y -= 1
        //     } else if (e.y === 1) {
        //         user.y += 1
        //     }
        // }
    }

    get socket() {
        return this._socket
    }

    _messageReceive() {


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