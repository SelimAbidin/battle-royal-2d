import { Sprite } from "./Sprite";
import { AssetsManager } from "../AssetsManager";

Hero.prototype = Object.create(Sprite.prototype)
Hero.prototype.constractor = Hero

function Hero(name) {
    Sprite.apply(this, [AssetsManager.getDrawableByKey("hero")])
    this.setSize(40, 40)
    this._vx = 0
    this._vy = 0
    this._name = name
    this.onKeyDown = this.onKeyDown.bind(this)
    this.onKeyUp = this.onKeyUp.bind(this)
    document.addEventListener('keydown', this.onKeyDown)
    document.addEventListener('keyup', this.onKeyUp)
}

Hero.prototype.onKeyDown = function (evt) {
    if (evt.keyCode === 87) { // up W
        this._vy = -1
    } else if (evt.keyCode === 83) { // down S
        this._vy = 1
    } else if (evt.keyCode === 65) { // down A
        this._vx = -1
    } else if (evt.keyCode === 68) { // down D
        this._vx = 1
    }
}

Hero.prototype.onKeyUp = function (evt) {
    if (evt.keyCode === 87 && this._vy < 0) { // up W
        this._vy = 0
    } else if (evt.keyCode === 83 && this._vy > 0) { // down S
        this._vy = 0
    } else if (evt.keyCode === 65 && this._vx < 0) { // down A
        this._vx = 0
    } else if (evt.keyCode === 68 && this._vx > 0) { // down D
        this._vx = 0
    }
}

Hero.prototype.setLife = function (life) {
    this._life = life
}

Hero.prototype.getLife = function () {
    return this._life
}

Hero.prototype.getMoveY = function (ctx) {
    return this._vy
}

Hero.prototype.getMoveX = function (ctx) {
    return this._vx
}

Hero.prototype.draw = function (context) {
    Sprite.prototype.draw.apply(this, arguments)
    context.font = "15px Arial";
    context.fillStyle = "white";
    context.textAlign = "center";
    context.fillText(this._name, this._x, this._y + 40);
}

export { Hero }