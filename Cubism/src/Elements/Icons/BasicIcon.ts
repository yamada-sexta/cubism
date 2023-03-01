import {CubismElement} from "../Basic/CubismElement";
import {Point2D} from "../../Utils/Math/Point";

export default class BasicIcon extends CubismElement {
    _size: Point2D = new Point2D(20, 20);

    draw() {
        super.draw();
        this.c.offset(this.position);
        this.drawIcon();
        this.c.restoreTranslate();
    }

    drawIcon() {
        throw new Error("Not implemented");
    }
}
