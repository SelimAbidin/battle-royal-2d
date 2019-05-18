import { Object2D } from './Object2D'
function Camera() {
    Object2D.apply(this)
}

Camera.prototype = Object.create(Object2D.prototype)
Camera.prototype.constractor = Camera

Camera.prototype.begin = function (ctx) {
    ctx.translate(-this._x, -this._y)
}

Camera.prototype.end = function (ctx) {
    ctx.translate(this._x, this._y)
}


export { Camera }