import { vec2, mat3 } from 'gl-matrix'
import { Object2D } from './Object2D'

function Sprite(drawable) {
    Object2D.apply(this)
    this._drawable = drawable
    this.setSize(drawable.width, drawable.height)
}

Sprite.prototype = Object.create(Object2D.prototype)
Sprite.prototype.constractor = Sprite

Sprite.prototype.setViewMatrix = function (left) {
    return this._left
}

Sprite.prototype.draw = function (context) {
    var position = vec2.transformMat3(vec2.create(), this.position, this.modelViewMatrix)
    var drawable = this._drawable
    context.drawImage(drawable.image, position[0], position[1], this._width, this._height)
}

export { Sprite }
