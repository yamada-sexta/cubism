import {PointerInteractThemeElement} from "./Basic/PointerInteractThemeElement";

export class RectElement extends PointerInteractThemeElement {
    draw() {
        super.draw();
        let c = this.c;
        c.offset(this.position);
        c.drawRectWithPoints(this.absSize);
        c.restoreTranslate();
    }
}
