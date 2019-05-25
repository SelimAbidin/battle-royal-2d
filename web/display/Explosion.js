import { Sprite } from "./Sprite";
import { AssetsManager } from "../AssetsManager";

Explosion.prototype = Object.create(Sprite.prototype)
Explosion.prototype.constractor = Explosion
function Explosion() {
    Sprite.apply(this, [AssetsManager.getDrawableByKey("explosion")])
    this.setSize(80, 80)
    this._life = 600
}


Explosion.prototype.isDead = function (frame) {
    return this._life < 0
}

Explosion.prototype.update = function (frame) {
    this._life -= frame.deltaTime
}

export { Explosion }