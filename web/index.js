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
AssetsManager.addImage("hero", '/images/hero.png')
AssetsManager.addImage("enemy", '/images/enemy.png')
AssetsManager.addImage("bullet", '/images/bullet.png')
AssetsManager.addImage("target", '/images/target.png')
AssetsManager.addImage("smoke", '/images/smoke.png')
AssetsManager.addImage("explosion", '/images/explosion.png')


let names = ['Adam', 'Martin', 'Irina', 'Selim', 'Saksağan']
AssetsManager.onReady(function () {

    // window.prompt("Your nick will be here", "");

    let userName = 'Adam' + Date.now()
    // let userName = names.pop()

    socket.on('MESSAGE', function (message) {

        let state = message.s
        var game = new Game(gameCanvas, userName)
        game.init()
        if (state === 0) {

            game.isObserver = true

        } else {
        }

        game.start()

        window.game = game

    })
    socket.emit('ADD_NAME', userName)
})
