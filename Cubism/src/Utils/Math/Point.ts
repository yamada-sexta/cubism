/**
 * A representation of a point in 2D space.
 */
export class Point2D implements IPoint2D {
    arr: number[]

    constructor(x: number, y: number) {
        this.arr = [x, y];
    }

    static get zero() {
        return new Point2D(0, 0);
    }

    static fromIPoint(i: IPoint2D) {
        return new Point2D(i.x, i.y);
    }

    static fromArray(arr: number[]): Point2D {
        return new Point2D(arr[0], arr[1]);
    }

    static fromNumber(n: number): Point2D {
        return new Point2D(n, n);
    }

    static getRandom(min: number | null = null, max: number | null = null) {

        if (max === null) {
            if (min !== null) {
                max = min;
                min = 0;
            } else {
                max = 1;
                min = 0;
            }
        }

        min = min || 0;

        return new Point2D(Math.random() * (max - min) + min, Math.random() * (max - min) + min);
    }

    get x() {
        return this.arr[0];
    }

    set x(value: number) {
        this.arr[0] = value;
    }

    get y() {
        return this.arr[1];
    }

    set y(value: number) {
        this.arr[1] = value;
    }

    clone(): Point2D {
        return new Point2D(this.x, this.y);
    }

    setXY(x: number, y: number) {
        this.x = x;
        this.y = y;
        return this;
    }

    get max() {
        return Math.max(this.x, this.y);
    }

    get min() {
        return Math.min(this.x, this.y);
    }

    set(point: Point2D) {
        this.x = point.x;
        this.y = point.y;
        return this;
    }


    /**
     * Offset the point by the given amount.
     * @param offset
     */
    offset(offset: Point2D) {
        this.x += offset.x;
        this.y += offset.y;
        return this;
    }

    identity(): Point2D {

        let rotation = Math.atan2(this.y, this.x);
        // let length = this.euclideanDistance(Point2D.zero);

        return new Point2D(Math.cos(rotation) , Math.sin(rotation) );
    }

    /**
     * Offset the point by the negative given amount.
     * @param offset
     */
    nOffset(offset: Point2D) {
        this.x -= offset.x;
        this.y -= offset.y;
        return this;
    }

    add(other: Point2D): Point2D {
        return this.clone().offset(other);
    }

    sub(other: Point2D): Point2D {
        return this.clone().nOffset(other);
    }

    subXY(x: number, y: number): Point2D {
        return this.sub(new Point2D(x, y));
    }

    mul(other: Point2D): Point2D {
        return new Point2D(this.x * other.x, this.y * other.y);
    }

    scale(n: number): Point2D {
        return new Point2D(this.x * n, this.y * n);
    }

    toString() {
        return `[${this.x}, ${this.y}]`;
    }

    euclideanDistance(other: Point2D): number {
        return Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2));
    }

    manhattanDistance(other: Point2D): number {
        return Math.abs(this.x - other.x) + Math.abs(this.y - other.y);
    }

    angleTo(other: Point2D): number {
        return Math.atan2(other.y - this.y, other.x - this.x);
    }
}
