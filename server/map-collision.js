
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



function inWalkable(x, y) {
    var roundX = Math.floor(x / TILE_SIZE)
    var roundY = Math.floor(y / TILE_SIZE)

    if (roundX < 0 || roundX >= MAP.length) {
        return false
    }

    if (roundY < 0 || roundY >= MAP[0].length) {
        return false
    }

    if (MAP[roundX][roundY] === 0) {
        return true
    }
}
module.exports = {
    lousyCollision,
    inWalkable
}