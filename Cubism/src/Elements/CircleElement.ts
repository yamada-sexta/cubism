import {PointerInteractThemeElement} from "./Basic/PointerInteractThemeElement";
import {Point2D} from "../Utils/Math/Point";

export class CircleElement extends PointerInteractThemeElement {
    draw(): void {
        super.draw();
        let c = this.c;
        // let center = this.centerPoint;
        c.offset(this.position);
        c.drawCircle(this.width/2, this.height/2, this.size.min / 2);
        // console.log("Drawing circle at: ", center);
        c.restoreTranslate();
    }
    pointerInRange(point: Point2D): boolean {
        let radius = this.size.min / 2;
        let dist = this.centerPoint.euclideanDistance(point);
        return dist <= radius;
    }
}
