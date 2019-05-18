import { Object2D } from './Object2D'
function Camera() {
    Object2D.apply(this)
}

Camera.prototype = Object.create(Object2D.prototype)
Camera.prototype.constractor = Camera

Camera.prototype.begin = function (ctx) {
    ctx.save();
    // ctx.scale(0.2, 0.2)
    ctx.translate(-this._x, -this._y)
}

Camera.prototype.end = function (ctx) {
    // ctx.scale(1, 1)
    // ctx.translate(this._x, this._y)
    ctx.restore();

}


export { Camera }