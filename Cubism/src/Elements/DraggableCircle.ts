import {CircleElement} from "./CircleElement";
import {Point2D} from "../Utils/Math/Point";
import {PointerPoint} from "../Datatypes/PointerPoint";

export class DraggableCircle extends CircleElement implements IPoint2D {
    _isDragging: boolean = false;
    _dragStartPoint: Point2D | null = null;
    _dragStartPos: Point2D | null = null;

    get x(): number {
        return this.centerPoint.x;
    }
    // set x(x: number) {
    //     this.setPosFromXY(x, this.y);
    // }
    get y(): number {
        return this.centerPoint.y;
    }
    // set y(y: number) {
    //     this.setPosFromXY(this.x, y);
    // }

    onCreate() {
        super.onCreate();
        this.setSizeFromXY(20, 20);
    }


    get isDragging(): boolean {
        return this._isDragging;
    }

    onDown(point: PointerPoint): void {
        super.onDown(point);
        this._isDragging = true;
        this._dragStartPoint = point;
        this._dragStartPos = this.position;
    }

    onUp(point: PointerPoint): void {
        super.onUp(point);
        this._isDragging = false;
        this._dragStartPoint = null;
        this._dragStartPos = null;
    }

    onMove(point: PointerPoint): void {
        super.onMove(point);

    }

    onParentMove(point: PointerPoint) {
        super.onParentMove(point);
        if (this._isDragging) {
            if (this._dragStartPoint !== null && this._dragStartPos !== null) {
                let diff = point.sub(this._dragStartPoint);
                this.position = this._dragStartPos.add(diff);
            }
        }
    }
}
