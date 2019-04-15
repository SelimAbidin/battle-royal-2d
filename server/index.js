const express = require('express')
const app = express()
const ejs = require('ejs')
const http = require('http').Server(app)
const io = require('socket.io')(http)


let users = []
let userMap = {}

function createUser(name, userID, socket) {
    let user = {
        name,
        id: userID,
        x: 0,
        y: 0,
        socket
    }

    users.push(user)
    userMap[userID] = user
}

io.on('connection', function (socket) {
    console.log('an user connected', socket.id);

    socket.on('ADD_NAME', (name) => {
        createUser(name, socket.id, socket)
    })

    socket.on('USER', (e) => {

        let user = userMap[socket.id]
        if (!user) {
            return
        }

        if (e.x === -1) {
            user.x -= 1
        } else if (e.x === 1) {
            user.x += 1
        }

        if (e.y === -1) {
            user.y -= 1
        } else if (e.y === 1) {
            user.y += 1
        }
    })

    socket.on('disconnect', () => {
        console.log('User disconnect', socket.id);
    })

});



setInterval(() => {
    // io.emit(users)
    // io.en

    let socketUsers = users.map(({ x, y, name }) => ({ x, y, name }))
    io.emit('UPDATE', socketUsers)

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