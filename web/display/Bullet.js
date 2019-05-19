import { Sprite } from "./Sprite";
import { AssetsManager } from "../AssetsManager";

Bullet.prototype = Object.create(Sprite.prototype)
Bullet.prototype.constractor = Bullet



// function tween(t) {
//     return (--t) * t * t + 1
// }


//easeInOutQuart:
let tween = function (t) { return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t }



// function tween(t) { return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t }

function Bullet(model) {
    Sprite.apply(this, [AssetsManager.getDrawableByKey("bullet")])
    let dx = model.tx - model.x
    let dy = model.ty - model.y
    let dist = Math.sqrt(dx * dx + dy * dy)

    let t = tween(model.t * 1)
    let d = t * dist
    let angle = Math.atan2(dy, dx)
    let x = model.x + Math.cos(angle) * d
    let y = model.y + Math.sin(angle) * d


    let size = Math.abs(Math.sin(t * 3))
    size = 15 * size + 15
    this.setSize(size, size)
    this.setPosition(x, y)
}

export { Bullet }