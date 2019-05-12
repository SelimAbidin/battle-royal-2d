
const { MAP, TILE_SIZE } = require('../common/map')


function lousyCollision(x, nextX, y, nextY, out) {

    var roundX = Math.floor(nextX / TILE_SIZE)
    var roundY = Math.floor(nextY / TILE_SIZE)
    if (MAP[roundX][roundY] === 0) {
        out.x = nextX
        out.y = nextY
    } else {
        out.x = x
        out.y = y
    }
    return out
}

module.exports = {
    lousyCollision
}