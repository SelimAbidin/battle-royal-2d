import { Sprite } from "./Sprite";
import { AssetsManager } from "../AssetsManager";

Enemy.prototype = Object.create(Sprite.prototype)
Enemy.prototype.constractor = Enemy

function Enemy() {
    Sprite.apply(this, [AssetsManager.getDrawableByKey("happy")])
    this.setSize(40, 40)
    this._vx = 0
    this._vy = 0
}


export { Enemy }