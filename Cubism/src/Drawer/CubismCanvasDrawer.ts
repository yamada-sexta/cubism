import {Point2D} from "../Utils/Math/Point";
import {CubismCanvasState} from "./CubismCanvasState";
import CubismPart from "../CubismPart";
import {Cubism} from "../Cubism";
import {EventKeys} from "../Constants/EventKeys";

/**
 * Adaptor class for the canvas
 * with the ability to draw on it
 * and handle events
 */
export class CubismCanvasDrawer extends CubismPart {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    get eventSystem() {
        return this.cubism.eventSystem;
    }

    state: CubismCanvasState; // the state of the canvas

    /**
     * Constructor of the CanvasDrawer
     * @param canvas the canvas to draw on
     */
    constructor(canvas: HTMLCanvasElement) {
        super();
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        this.state = new CubismCanvasState(canvas, this.ctx);
    }

    setCubism(cubism: Cubism) {
        super.setCubism(cubism);

        this.registerFrameUpdate();
    }

    get width() {
        return this.canvas.width;
    }

    set width(width: number) {
        this.canvas.width = width;
    }

    get height() {
        return this.canvas.height;
    }

    set height(height: number) {
        this.canvas.height = height;
    }

    /**
     * Register the frame update event
     * @private
     */
    private registerFrameUpdate() {
        // console.log("Registering frame update");
        this.eventSystem.registerEvent(EventKeys.FRAME_UPDATE, this.frameUpdate.bind(this));
    }

    /**
     * Things to do on every frame update
     * @private
     */
    private frameUpdate() {
        // console.log("Frame update");
        if (this.state.needsRedraw) {
            this.triggerRedraw();
            // console.log("Redrawing");
            this.state.needsRedraw = false;
        }
    }

    /**
     * Clear the canvas
     */
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvas.width = this.cubism.width;
    }

    /**
     * Set the fill style(color) of the canvas
     * @param style the style to set
     */
    setFillStyle(style: string) {
        this.ctx.fillStyle = style;
    }

    /**
     * Set the stroke style(color) of the canvas
     * @param style the style to set
     */
    setStrokeStyle(style: string) {
        this.ctx.strokeStyle = style;
    }

    /**
     * Set the line width of the canvas
     * @param width
     */
    setStrokeWidth(width: number) {
        this.ctx.lineWidth = width;
    }

    /**
     * Translate the canvas
     * @param offset
     */
    offset(offset: Point2D) {
        this.state.offset(offset);
    }

    offsetXY(x: number, y: number) {
        this.state.offset(new Point2D(x, y));
    }

    rotate(angle: number) {
        this.state.rotate(angle);
    }

    scale(scale: Point2D | number) {
        if (typeof scale === "number") {
            scale = Point2D.fromNumber(scale);
        }
        this.state.scale(scale);
    }


    /**
     * Restore translation and rotation to previous state
     */
    restoreTranslate() {
        this.state.restoreTranslate();
    }

    /**
     * Draw text on the canvas
     * @param text the text to draw
     * @param x the x position of the text
     * @param y the y position of the text
     */
    fillText(text: string, x: number, y: number) {
        this.ctx.fillText(text, x, y);
    }

    /**
     * Draw a line with two Point2Ds
     * @param begin the beginning of the line
     * @param end the end of the line
     */
    drawLineWithPoints(begin: IPoint2D, end: IPoint2D) {
        this.drawLine(begin.x, begin.y, end.x, end.y);
    }

    /**
     * Draw a line with four numbers
     * @param beginX the x position of the beginning of the line
     * @param beginY the y position of the beginning of the line
     * @param endX the x position of the end of the line
     * @param endY the y position of the end of the line
     */
    drawLine(beginX: number, beginY: number, endX: number, endY: number) {
        this.ctx.beginPath();
        this.ctx.moveTo(beginX, beginY);
        this.ctx.lineTo(endX, endY);
        this.closeDraw();
    }

    drawCircle(x: number, y: number, radius: number) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.closeDraw();
    }

    drawPoint(point: IPoint2D, radius: number = 5) {
        this.drawCircle(point.x, point.y, radius);
    }


    drawShape(points: IPoint2D[]) {
        this.ctx.beginPath();
        this.ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            this.ctx.lineTo(points[i].x, points[i].y);
        }
        this.closeDraw();
    }

    drawRectWithPoints(p1: IPoint2D, p2: IPoint2D | null = null) {
        if (p2 === null) {
            this.drawRect(0, 0, p1.x, p1.y);
        } else {
            this.drawRect(p1.x, p1.y, p2.x, p2.y);
        }
    }

    drawRect(x: number, y: number, width: number, height: number) {
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(width, y);
        this.ctx.lineTo(width, height);
        this.ctx.lineTo(x, height);
        this.closeDraw();
    }

    drawPathString(path: string) {
        this.drawPath(new Path2D(path));
    }

    /**
     * Draw an HTML Canvas Path on the canvas
     * @param path
     */
    drawPath(path: Path2D) {
        this.ctx.stroke(path);
    }

    /**
     * Close the drawing path
     */
    closeDraw() {
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
    }

    /**
     * Set the font of the canvas
     * @param font
     */
    setFont(font: string) {
        this.ctx.font = font;
    }

    /**
     * Set the need redraw flag
     * @param redraw
     */
    setRedraw(redraw: boolean) {
        this.state.needsRedraw = redraw;
    }

    measureText(text: string) {
        return this.ctx.measureText(text);
    }

    /**
     * Trigger a redraw event
     * Seems more responsive than setRedraw()
     */
    triggerRedraw() {
        this.eventSystem.triggerEvent(EventKeys.REDRAW);
    }

    drawSVG(svg: string) {
        const img = new Image();
        img.src = "data:image/svg+xml;base64," + btoa(svg);
        this.ctx.drawImage(img, 0, 0);
    }

    drawImage(image: HTMLImageElement, x: number = 0, y: number = 0, width: number = 0, height: number = 0) {
        this.ctx.drawImage(image, x, y, width, height);
    }

    drawArrow(pos: Point2D, rotation: number, length: number = 10) {
        this.state.save();
        this.offset(pos);
        this.rotate(rotation);
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(length, 0);
        this.ctx.lineTo(length - 5, -5);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.moveTo(length, 0);
        this.ctx.lineTo(length - 5, 5);
        this.restoreTranslate();
        this.restoreTranslate();
        this.state.restoreSave();
        this.closeDraw();
        // this.restoreTranslate();
        // this.restoreTranslate();
        // this.restoreTranslate();
    }
}
