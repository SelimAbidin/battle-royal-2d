import { Sprite } from "./Sprite";
import { AssetsManager } from "../AssetsManager";

Bullet.prototype = Object.create(Sprite.prototype)
Bullet.prototype.constractor = Bullet



// function tween(t) {
//     return (--t) * t * t + 1
// }


function tween(t) { return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t }

function Bullet(model) {
    Sprite.apply(this, [AssetsManager.getDrawableByKey("bullet")])
    // this._vx = 0
    // this._vy = 0
    // this._startX = model.x
    // this._startY = model.y

    // this._startX = model.tx
    // this._startY = model.ty

    let dx = model.tx - model.x
    let dy = model.ty - model.y
    let dist = Math.sqrt(dx * dx + dy * dy)

    let t = tween(model.t * 2)
    let d = t * dist
    let angle = Math.atan2(dy, dx)
    let x = model.x + Math.cos(angle) * d
    let y = model.y + Math.sin(angle) * d


    let size = Math.abs(Math.sin(t * 3))
    this.setSize(15 * size + 15, 15 * size + 15)




    // if (model.t < 0.4) {
    //     let ratio = (model.t / 0.3) + 0.1
    //     this.setSize(30 * ratio, 30 * ratio)
    // } else if (model.t > 0.7) {
    //     let ratio = (0.3 / model.t) + 0.1
    //     this.setSize(30 * ratio, 30 * ratio)
    // } else {
    //     this.setSize(30 * t, 30 * t)
    // }

    this.setPosition(x, y)
}

export { Bullet }