import { Game } from './Game'
import { AssetsManager } from './AssetsManager'
import { socket } from './socket'
import { START_MESSAGE } from '../common/variables'


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
AssetsManager.addImage("hero", '/images/hero.png')
AssetsManager.addImage("enemy", '/images/enemy.png')
AssetsManager.addImage("bullet", '/images/bullet.png')
AssetsManager.addImage("target", '/images/target.png')
AssetsManager.addImage("smoke", '/images/smoke.png')
AssetsManager.addImage("explosion", '/images/explosion.png')


var names = ['Adam', 'Martin', 'Irina', 'Selim', 'Saksağan']
AssetsManager.onReady(function () {

    // window.prompt("Your nick will be here", "");

    var userName = 'Adam' + Date.now()
    // var userName = names.pop()

    socket.once('START_MESSAGE', function (message) {

        var state = message.s
        var game = new Game(gameCanvas, userName)
        game.init()
        if (state === START_MESSAGE.OBSERVER) {
            game.isObserver = true
        }
        game.start()

        window.game = game

    })
    socket.emit('ADD_NAME', userName)
})
