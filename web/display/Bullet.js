import { Sprite } from "./Sprite";
import { AssetsManager } from "../AssetsManager";

Bullet.prototype = Object.create(Sprite.prototype)
Bullet.prototype.constractor = Bullet

function Bullet() {
    Sprite.apply(this, [AssetsManager.getDrawableByKey("bullet")])
    this.setSize(30, 30)
    this._vx = 0
    this._vy = 0
}

export { Bullet }