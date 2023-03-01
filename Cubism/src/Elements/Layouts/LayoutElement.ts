import PointerHandlerParentElement from "../Basic/PointerHanderParentElement";
import {Point2D} from "../../Utils/Math/Point";

export abstract class LayoutElement extends PointerHandlerParentElement {
    getMaxElementWidth(): number {
        let maxWidth = 0;
        for (let child of this.children) {
            if (child.absWidth > maxWidth) {
                maxWidth = child.absWidth;
            }
        }
        return maxWidth;
    }
    getCumulativeWidth(): number {
        let width = 0;
        for (let child of this.children) {
            width += child.absWidth;
        }
        return width;
    }
    getMaxElementHeight(): number {
        let maxHeight = 0;
        for (let child of this.children) {
            if (child.absHeight > maxHeight) {
                maxHeight = child.absHeight;
            }
        }
        return maxHeight;
    }
    getCumulativeHeight(): number {
        let height = 0;
        for (let child of this.children) {
            height += child.absHeight;
        }
        return height;
    }
    pointerInRange(point: Point2D): boolean {
        // console.log(`Pointer in range of ${this}`);
        return true;
    }
}
