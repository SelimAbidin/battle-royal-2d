import {Game} from './Game'

function createCanvas(width, height) {
    var canvas = document.createElement('canvas')
    canvas.style.width = width + 'px'
    canvas.style.height = height + 'px'
    canvas.style.border = "1px solid #ff00ff"
    canvas.width = width
    canvas.height = height
    return canvas
}


var gameCanvas = createCanvas(500, 500)
document.body.appendChild(gameCanvas)




async function startGame() {
    var game = new Game(gameCanvas)
    game.init()
}


startGame()

// game.addMap()