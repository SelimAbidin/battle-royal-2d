import { Object2D } from './Object2D'

function Sprite(drawable) {
    Object2D.apply(this)
    this._drawable = drawable
    this.setSize(drawable.width, drawable.height)
}

Sprite.prototype = Object.create(Object2D.prototype)
Sprite.prototype.constractor = Sprite

Sprite.prototype.getGraphic = function () {
    return this._drawable.image
}

Sprite.prototype.draw = function (camera, context) {
    var halfW = this._width / 2
    var halfH = this._height / 2
    var x = (this._x - camera.getX()) - halfW
    var y = (this._y - camera.getY()) - halfH
    context.drawImage(this._drawable.image, parseInt(x, 10) + 0.5, parseInt(y, 10) + 0.5, this._width, this._height)
}

export { Sprite }
