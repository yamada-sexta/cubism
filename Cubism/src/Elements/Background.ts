import {CubismElement} from "./Basic/CubismElement";
import {Colors} from "../Constants/Colors";

export class Background extends CubismElement{
    color: string = Colors.white;
    setColor(color: string) {
        this.color = color;
        return this;
    }
    draw() {
        super.draw();
        this.c.setFillStyle(this.color);
        this.c.drawRect(0, 0, this.cubism.width, this.cubism.height);
    }
}