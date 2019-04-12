

function Sprite(drawable) {
    console.log(drawable);

    this._drawable = drawable
    this._x = 0
    this._y = 0
    this._width = drawable.width
    this._height = drawable.height
}

Sprite.prototype.draw = function (context) {
    var drawable = this._drawable
    context.drawImage(drawable.image, this._x, this._y, this._width, this._height)
}

export { Sprite }
