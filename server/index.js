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
    player.setPosition(0, 0)
    game.addUser(player)
}


io.on('connection', function (socket) {
    console.log('an user connected', socket.id);

    socket.on('ADD_NAME', (name) => {
        createUser(name, socket.id, socket, 0)
    })

    // socket.on('USER', (e) => {
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
    // })

});



setInterval(() => {
    game.update()
    // console.log(game.serialize());

    io.emit('UPDATE', game.serialize())
    // users.forEach(user => {
    //     user.socket.emit('UPDATE', {
    //         x: user.x,
    //         y: user.y
    //     })
    // })

    // let socketUsers = users.map(({ x, y, name, type }) => ({ x, y, name, type }))
    // io.emit('UPDATE', socketUsers)
    // users.forEach(user => {
    //     user.socket.emit('UPDATE', {
    //         x: user.x,
    //         y: user.y
    //     })
    // })


}, 1000 / 60)

http.listen(3000, () => {
    console.log('Server Started')
})