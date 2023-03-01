import {Point2D} from "../../Utils/Math/Point";
import {CubismCanvasDrawer} from "../../Drawer/CubismCanvasDrawer";
import {Cubism} from "../../Cubism";
import {CubismEventSystem} from "../../Events/CubismEventSystem";
import SizeKeys from "../../Constants/SizeKeys";
import {needsRedrawAccessor} from "../../Utils/Decorators/NeedsRedraw";

/**
 * Base class for all elements that can be rendered on the canvas
 * With size, position, and global events
 */
export class CubismElement extends CubismEventSystem implements IDrawable {
    _position: Point2D = new Point2D(0, 0);
    _size: Point2D = new Point2D(SizeKeys.MATCH_PARENT, SizeKeys.MATCH_PARENT);
    _absSize: Point2D = new Point2D(0, 0); // Absolute size is the size of the element
    _anchor: Point2D = new Point2D(0, 0);


    elementId: string | null = null;
    needsResize: boolean = true;

    constructor(elementId: string | null = null) {
        super();
        // Optional id
        this.elementId = elementId;
        this.onCreate();
    }

    onCreate(): void {

    }


    get anchor(): Point2D {
        return this._anchor;
    }

    @needsRedrawAccessor()
    set anchor(anchor: Point2D) {
        this._anchor = anchor;
    }

    /**
     * Set id for this element so that it can be accessed by the id
     * @param id
     */
    setId(id: string): this {
        this.elementId = id;
        if (this._cubism) {
            this._cubism.registerElementId(id, this);
        }
        return this;
    }

    /**
     * Set cubism instance for this element
     * @param cubism
     */
    setCubism(cubism: Cubism): void {
        super.setCubism(cubism);
        if (this.elementId !== null) {
            this.setId(this.elementId);
        }
    }

    /**
     * Set position of this element relative to parent
     * @param pos
     */
    @needsRedrawAccessor()
    set position(pos: Point2D) {
        this._position = pos;
        // this.c.setRedraw(true);
    }

    /**
     * Get position of this element relative to parent
     */
    get position(): Point2D {
        return this._position;
    }

    /**
     * Get a size description of this element
     * Not necessarily the size of the element
     */

    get size(): Point2D {
        return this._size;
    }

    /**
     * Set size of this element
     *
     * @param size size description
     */
    set size(size: Point2D) {
        this.setSizeFromXY(size.x, size.y);
    }

    setSizeFromXY(x: number, y: number): this {
        this.size.x = x;
        this.size.y = y;
        this.needsResize = true;
        return this;
    }

    /**
     * Get the actual size of this element
     */
    get absSize(): Point2D {
        return this._absSize;
    }

    /**
     * Set the actual size of this element
     * @param size
     */
    @needsRedrawAccessor()
    set absSize(size: Point2D) {
        this._absSize = size;
        this.c.setRedraw(true);
    }

    get height(): number {
        return this.size.y;
    }

    set height(y: number) {
        this.setSizeFromXY(this.width, y);
    }

    get width(): number {
        return this.size.x;
    }

    set width(x: number) {
        this.setSizeFromXY(x, this.height);
    }

    get absWidth(): number {
        return this.absSize.x;
    }

    set absWidth(x: number) {
        this.absSize.x = x;
    }

    get absHeight(): number {
        return this.absSize.y;
    }

    set absHeight(y: number) {
        this.absSize.y = y;
    }

    setWidth(width: number) {
        this.width = width;
        this.needsResize = true;
        return this;
    }

    setHeight(height: number) {
        this.height = height;
        return this;
    }

    setPosFromPoint(pos: Point2D): this {
        this.position = pos;
        return this;
    }

    setPosFromXY(x: number, y: number): this {
        this.position.x = x;
        this.position.y = y;
        return this;
    }

    get centerPoint(): Point2D {
        return new Point2D(this.position.x + this.width / 2, this.position.y + this.height / 2);
    }


    /**
     * Resize this element to targetSize size
     * and mark it as resized
     * @param targetSize
     */
    resize(targetSize: Point2D) {
        this.resizeFromXY(targetSize.x, targetSize.y);
    }

    /**
     * Resize this element to targetSize size
     * and mark it as resized
     * @param x width
     * @param y height
     */
    resizeFromXY(x: number, y: number): void {
        this.absWidth = x;
        this.absHeight = y;
        this.needsResize = false;
    }

    /**
     * Get canvas drawer
     */
    get c(): CubismCanvasDrawer {
        if (!this.cubism) {
            console.log(this.cubism)
            throw new Error(`Cubism instance not set for ${this}`);
        }
        return this.cubism.canvasDrawer;
    }



    /**
     * Render this element
     */
    draw(): void {
    }

    /**
     * Get a string representation of this element
     */
    toString(): string {
        return `[${this.elementId ? this.elementId : "NO ID"}]: ${this.className} abs(${this.absWidth}x${this.absHeight}) rel(${this.width}x${this.height})`;
    }

}
