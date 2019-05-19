import { Sprite } from "./Sprite";
import { AssetsManager } from "../AssetsManager";

DropArea.prototype = Object.create(Sprite.prototype)
DropArea.prototype.constractor = DropArea
function DropArea() {
    Sprite.apply(this, [AssetsManager.getDrawableByKey("target")])
    this.setSize(40, 40)
}

export { DropArea }