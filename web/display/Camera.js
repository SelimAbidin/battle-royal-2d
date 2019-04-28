import { vec2, mat3 } from 'gl-matrix'
import { Object2D } from './Object2D'
function Camera() {
    Object2D.apply(this)
    this.viewMatrix = mat3.create()
    this._viewPosition = vec2.create()
}

Camera.prototype = Object.create(Object2D.prototype)
Camera.prototype.constractor = Camera

Camera.prototype.setPosition = function (x, y) {
    Object2D.prototype.setPosition.apply(this, [x, y])
    this._viewPosition[0] = -x
    this._viewPosition[1] = -y
    mat3.fromTranslation(this.viewMatrix, this._viewPosition)
}


export { Camera }