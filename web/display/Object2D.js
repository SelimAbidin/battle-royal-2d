import { vec2, mat3 } from 'gl-matrix'

function Object2D() {
    this._x = 0
    this._y = 0
    this.position = vec2.create()
    this.modelViewMatrix = mat3.create()
}

Object2D.prototype.setPosition = function (x, y) {
    this.position = vec2.set(this.position, x, y)
    this._x = x
    this._y = y
}


Object2D.prototype.getX = function () {
    return this._x
}

Object2D.prototype.getY = function () {
    return this._y
}

Object2D.prototype.setSize = function (w, h) {
    this._width = w
    this._height = h
}




export { Object2D }