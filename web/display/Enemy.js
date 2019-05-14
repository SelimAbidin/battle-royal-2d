import { Sprite } from "./Sprite";
import { AssetsManager } from "../AssetsManager";

Enemy.prototype = Object.create(Sprite.prototype)
Enemy.prototype.constractor = Enemy

function Enemy(name) {
    Sprite.apply(this, [AssetsManager.getDrawableByKey("enemy")])
    this.setSize(40, 40)
    this._vx = 0
    this._vy = 0
    this._name = name
}

Enemy.prototype.draw = function (camera, context) {
    Sprite.prototype.draw.apply(this, arguments)
    context.font = "15px Arial";
    context.fillStyle = "yellow";
    context.textAlign = "center";
    context.fillText(this._name, this._x - camera.getX(), (this._y + 40) - camera.getY());
}

export { Enemy }