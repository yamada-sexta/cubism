import PointerHandlerParentElement from "../Basic/PointerHanderParentElement";
import {CubismElement} from "../Basic/CubismElement";
import {Colors} from "../../Constants/Colors";
import {Cubism} from "../../Cubism";
import {needsRedrawAccessor} from "../../Utils/Decorators/NeedsRedraw";

export class ChangingRainbowBackground extends CubismElement{
    frameCount: number = 0;

    saturation:number = 70;
    lightness: number = 90;
    changingSpeed: number = 0.2;

    setSaturation(s: number) {
        if (s > 100) {
            s = 100;
        }
        this.saturation = s;
        return this;
    }
    setChangingSpeed(speed: number) {
        this.changingSpeed = speed;
        return this;
    }
    setLightness(l: number) {
        if (l > 100) {
            l = 100;
        }
        this.lightness = l;
        return this;
    }
    draw() {
        this.frameCount++;
        this.c.offset(this.position);
        let currHue = this.frameCount * this.changingSpeed % 360;
        let currColor = `hsl(${currHue}, ${this.saturation}%, ${this.lightness}%)`;

        this.c.setFillStyle(currColor);
        this.c.setStrokeWidth(0);
        this.c.setStrokeStyle(currColor);
        this.c.drawRect(0, 0, this.absWidth, this.absHeight);
        // super.draw();
        this.c.restoreTranslate();
    }
}
