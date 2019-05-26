import { Sprite } from "./Sprite";
import { AssetsManager } from "../AssetsManager";

Bullet.prototype = Object.create(Sprite.prototype)
Bullet.prototype.constractor = Bullet



// function tween(t) {
//     return (--t) * t * t + 1
// }


//easeInOutQuart:
var tween = function (t) { return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t }



// function tween(t) { return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t }

function Bullet(model) {
    Sprite.apply(this, [AssetsManager.getDrawableByKey("bullet")])
    var dx = model.tx - model.x
    var dy = model.ty - model.y
    var dist = Math.sqrt(dx * dx + dy * dy)

    var t = tween(model.t * 1)
    var d = t * dist
    var angle = Math.atan2(dy, dx)
    var x = model.x + Math.cos(angle) * d
    var y = model.y + Math.sin(angle) * d


    var size = Math.abs(Math.sin(t * 3))
    size = 15 * size + 15
    this.setSize(size, size)
    this.setPosition(x, y)
}

export { Bullet }