import { vec2, mat3 } from 'gl-matrix'
import { Object2D } from './Object2D'
function Camera() {
    Object2D.apply(this)
    // this._x = 0
    // this._y = 0
    // this._width = 100
    // this._height = 100
    // this._bound = {}
    // this.projection = mat3.projection(mat3.create(), this._width, this._height)
    // this.view = mat3.create()
    // this.updateViewBound()
}


Camera.prototype = Object.create(Object2D.prototype)
Camera.prototype.constractor = Camera

// Camera.prototype.setViewSize = function (width, height) {
//     this._width = width
//     this._height = height
//     this.projection = mat3.projection(this.modelViewMatrix, this._width, this._height)
// }

// Camera.prototype.setPosition = function (x, y) {
//     this._x = x
//     this._y = y
// }

// Camera.prototype.updateViewBound = function () {
//     this._bound.left = -this._width * 0.5
//     this._bound.right = this._width * 0.5
//     this._bound.top = -this._height * 0.5
//     this._bound.bottom = this._height * 0.5
// }

// Camera.prototype.getBoundLeft = function () {
//     return this._bound.left
// }


export { Camera }