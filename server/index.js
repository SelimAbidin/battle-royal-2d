const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)


io.on('connection', function (socket) {
    console.log('an user connected', socket);
});


http.listen(3000, () => {
    console.log('Server Started')
})