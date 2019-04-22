import { Sprite } from "./Sprite";
import { AssetsManager } from "../AssetsManager";

Bullet.prototype = Object.create(Sprite.prototype)
Bullet.prototype.constractor = Bullet

function Bullet() {
    Sprite.apply(this, [AssetsManager.getDrawableByKey("bullet")])
    this.setSize(10, 10)
    this._vx = 0
    this._vy = 0
}


Bullet.prototype.draw = function (ctx) {
    this.setPosition(this._x, this._y)
    Sprite.prototype.draw.apply(this, [ctx])
}

export { Bullet }