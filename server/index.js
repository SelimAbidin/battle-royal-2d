const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)


let users = []

function createUser(name, userID) {
    users.push({
        name,
        id: userID,
        x: 0,
        y: 0
    })
}

io.on('connection', function (socket) {
    console.log('an user connected', socket.id);


    socket.on('ADD_NAME', (name) => {
        createUser(name, socket.id)
    })

    socket.on('disconnect', () => {
        console.log('User disconnect', socket.id);
    })

});



setInterval(() => {

    io.emit(users)

}, 100)

http.listen(3000, () => {
    console.log('Server Started')
})