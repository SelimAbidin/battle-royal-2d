import { Object2D } from './Object2D'
function Camera() {
    Object2D.apply(this)
    this._shakeTime = 0
    this._force = 0
}

Camera.prototype = Object.create(Object2D.prototype)
Camera.prototype.constractor = Camera

Camera.prototype.begin = function (ctx) {
    ctx.save();
    // ctx.scale(0.2, 0.2)
}

Camera.prototype.followObject = function (object2d) {
    this._followObject = object2d
}

Camera.prototype.shakeByDistance = function (x, y) {

    let dx = this._x - x
    let dy = this._y - y

    let distance = Math.sqrt(dx * dx + dy * dy)

    if (distance < 1000) {
        this._force = 2300 / distance
        this._shakeTime = 1000
        if (this._force > 100) this._force = 100
    }

}


Camera.prototype.checkBorder = function () {

    let cameraX
    let cameraY

    if (this._followObject) {

        let follow = this._followObject

        if (follow.getX() < 350) {
            cameraX = 0
        } else if (follow.getX() > 4650) {
            cameraX = 4650 - 350
        } else {
            cameraX = follow.getX() - 350
        }

        if (follow.getY() < 350) {
            cameraY = 0
        } else if (follow.getY() > 4650) {
            cameraY = 4650 - 350
        } else {
            cameraY = follow.getY() - 350
        }

        this.setPosition(cameraX, cameraY)
    } else {

    }

}

Camera.prototype.update = function (frame) {
    this._shakeTime -= frame.deltaTime
    let ctx = frame.context

    // if (this._followObject) {
    //     this.setPosition(this._followObject.getX(), this._followObject.getY())
    // }

    this.checkBorder()

    if (this._shakeTime > 0) {
        let shakeTime = this._shakeTime / 1000
        let x = this.getX()
        let y = this.getY()
        let force = this._force
        this.setPosition(x + (Math.random() * shakeTime * force), y + (Math.random() * shakeTime * force))
    } else {

    }


    ctx.translate(-this._x, -this._y)
}



Camera.prototype.end = function (ctx) {
    // ctx.scale(1, 1)
    // ctx.translate(this._x, this._y)
    ctx.restore();

}


export { Camera }