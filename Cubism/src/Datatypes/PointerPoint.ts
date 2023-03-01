import {Point2D} from "../Utils/Math/Point";

export class PointerPoint extends Point2D {

    constructor(x: number, y: number, public pressure: number) {
        super(x, y);
    }

    static createFromPointerEvent(e: PointerEvent): PointerPoint {
        return new PointerPoint(e.offsetX, e.offsetY, e.pressure);
    }

    toString(): string {
        return `(x:${this.x}, y:${this.y}, p:${this.pressure})`;
    }

    sub(other: Point2D): PointerPoint {
        return new PointerPoint(this.x - other.x, this.y - other.y, this.pressure);
    }

    get pressed(): boolean {
        return this.pressure > 0;
    }
}
