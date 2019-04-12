

function Sprite(drawable) {
    this._drawable = drawable
    this._x = 0
    this._y = 0
    this._width = drawable.width
    this._height = drawable.height
}

Sprite.prototype.setSize = function (w, h) {
    this._width = w
    this._height = h
}

Sprite.prototype.setPosition = function (x, y) {
    this._x = x
    this._y = y
}

Sprite.prototype.draw = function (context) {
    var drawable = this._drawable
    context.drawImage(drawable.image, this._x, this._y, this._width, this._height)
}

export { Sprite }
