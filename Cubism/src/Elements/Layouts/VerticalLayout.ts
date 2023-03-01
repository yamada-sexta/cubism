import {LayoutElement} from "./LayoutElement";
import {Point2D} from "../../Utils/Math/Point";

export class VerticalLayout extends LayoutElement {
    updateChildrenPosition() {
        let maxChildWidth = 0;
        super.updateChildrenPosition();
        let x = 0;
        let y = 0;
        for (let child of this.children) {
            child.position = new Point2D(x, y);
            if (child instanceof LayoutElement) {
                child.height = child.getCumulativeHeight();
                child.width = child.getCumulativeWidth();
            }
            if (child.width > maxChildWidth) {
                maxChildWidth = child.width;
            }
            y += child.height;
        }
        this.absWidth = maxChildWidth;
        this.absHeight = y;
    }

    getCumulativeWidth(): number {
        return this.getMaxElementWidth();
    }
}
