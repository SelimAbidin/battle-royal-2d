const express = require('express')
const app = express()
const ejs = require('ejs')
const http = require('http').Server(app)
const io = require('socket.io')(http)
const { join } = require('path')
const { Game } = require('./game')
const { Player } = require('./player')
let userMap = {}



let game = new Game()

app.engine('.ejs', ejs.__express);
app.get('/users.html', (req, res) => {
    res.render(join(__dirname, 'views/users.ejs'), {
        users: users.map(i => ({
            name: i.name,
            id: i.id
        }))
    })
})


function createUser(name, userID, socket, type) {
    let player = new Player(userID, name, socket)
    player.setPosition(600, 600)
    game.addUser(player)
}


io.on('connection', function (socket) {
    socket.on('ADD_NAME', (name) => {
        createUser(name, socket.id, socket, 0)
    })
});



let deltaTime = Date.now()
setInterval(() => {

    game.update((Date.now() - deltaTime) / 1000)

    if (game.isOver()) {
        let gameEndData = game.serialize()
        gameEndData.state = 'GAME_OVER'
        io.emit('UPDATE', gameEndData)
        return
    }

    deltaTime = Date.now()
    io.emit('UPDATE', game.serialize())

}, 1000 / 90)

http.listen(3000, () => {
    console.log('Server Started')
})