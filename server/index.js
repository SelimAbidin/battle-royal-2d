const express = require('express')
const app = express()
const ejs = require('ejs')
const http = require('http').Server(app)
const io = require('socket.io')(http)
const { join } = require('path')
const { Game } = require('./game')
const { Player } = require('./player')


// let game = new Game()
let game


let allUsers = []
function addToAllUSers(user) {
    allUsers.push(user)

    user.socket.on('disconnect', () => {
        allUsers.splice(allUsers.indexOf(user), 1)
    })


}

app.engine('.ejs', ejs.__express);
app.get('/users.html', (req, res) => {
    res.render(join(__dirname, 'views/users.ejs'), {
        users: users.map(i => ({
            name: i.name,
            id: i.id
        }))
    })
})


function createUser(name, userID, socket) {
    let player = new Player(userID, name, socket)
    player.setPosition(600, 600)
    return player
}


io.on('connection', function (socket) {
    socket.on('ADD_NAME', (name) => {

        if (!game) {
            game = new Game()
        }


        let player = createUser(name, socket.id, socket)
        addToAllUSers(player)

        if (game.isWaitingForPlayer()) {
            game.addUser(player)
            socket.emit('START_MESSAGE', {
                s: 1,
                message: "Game already started"
            })
        } else {
            socket.emit('START_MESSAGE', {
                s: 0,
                message: "Game already started"
            })
        }


        // if (game.isWaitingForPlayer()) {
        // } else {
        //     socket.emit('MESSAGE', {
        //         s: 0,
        //         message: "Game already started"
        //     })
        // }

    })
});



let deltaTime = Date.now()
setInterval(() => {

    if (game) {

        game.update((Date.now() - deltaTime) / 1000)

        if (!game.isOver()) {
            io.emit('UPDATE', game.serialize())
        } else {

            io.emit('MESSAGE', {
                s: 3,
                t: 'Champion is ' + game.getWinner()
            })

            game = null
        }

        deltaTime = Date.now()
    }



}, 1000 / 60)

http.listen(3000, () => {
    console.log('Server Started')
})