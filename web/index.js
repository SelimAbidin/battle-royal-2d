import { Game } from './Game'
import { AssetsManager } from './AssetsManager'
import { socket } from './socket'


function createCanvas(width, height) {
    var canvas = document.createElement('canvas')
    canvas.style.width = width + 'px'
    canvas.style.height = height + 'px'
    canvas.style.border = "1px solid #ff00ff"
    canvas.width = width
    canvas.height = height
    return canvas
}


var gameCanvas = createCanvas(700, 700)
document.body.appendChild(gameCanvas)

// AssetsManager.addImage(0, '/images/green.png')
AssetsManager.addImage(0, '/images/tile.jpg')
AssetsManager.addImage(1, '/images/space.jpg')
AssetsManager.addImage("angel", '/images/angel.png')
AssetsManager.addImage("happy", '/images/happy.png')
AssetsManager.addImage("bullet", '/images/bullet.png')
AssetsManager.addImage("smoke", '/images/smoke.png')

AssetsManager.onReady(function () {

    let userName = 'Adam' + Date.now()
    socket.emit('ADD_NAME', userName)
    var game = new Game(gameCanvas, userName)
    game.init()
    game.start()

})
