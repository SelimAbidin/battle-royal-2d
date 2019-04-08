

function Sprite(drawable) {
    this._drawable = drawable
}

Sprite.prototype.draw = function (context) {
    context.drawImage(this._drawable)
}

export {Sprite}
