import { Object2D } from "./Object2D";
import { createGzip } from "zlib";
import { AssetsManager } from "../AssetsManager";

class Fog extends Object2D {

    constructor(center, maxRadius) {
        super()
        this._radius = null
        this._center = center
        this._maxRadius = maxRadius
        this._pattern = null
    }

    setRadius(radius) {
        this._radius = radius
    }

    getPattern(context) {

        if (this._pattern === null) {
            this._pattern = context.createPattern(AssetsManager.getDrawableByKey('smoke').image, "repeat");
        }
        return this._pattern
    }

    draw(ctx) {
        if (this._radius === null) return

        ctx.beginPath();

        if (!this._pattern) {
            this._pattern = this.getPattern(ctx)
        }

        ctx.fillStyle = this._pattern
        var x = this._x
        var y = this._y
        ctx.arc(x, y, this._maxRadius, 0, Math.PI * 2)
        ctx.arc(x, y, this._radius, 0, Math.PI * 2, true)
        ctx.fill()
    }


}

export { Fog }