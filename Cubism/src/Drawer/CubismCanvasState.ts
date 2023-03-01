import {Point2D} from "../Utils/Math/Point";
import {TransformMatrix2D} from "../Utils/Math/TransformMatrix2D";

/**
 * The state of the canvas
 */
export class CubismCanvasState {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.ctx = ctx;
    }

    private _translates: TransformMatrix2D[] = [TransformMatrix2D.identity()];
    get translates() {
        return this._translates;
    }

    private _saves: TransformMatrix2D[] = [];


    translate(translateMatrix: TransformMatrix2D) {
        this.translates.push(translateMatrix);
        this.setCtxTransform(translateMatrix);
    }

    offset(offset: Point2D) {
        let translateMatrix = this.translateMatrix.clone().offsetPoint(offset);
        this.translate(translateMatrix);
    }

    rotate(angle: number) {
        let translateMatrix = this.translateMatrix.clone().rotate(angle);
        this.translate(translateMatrix);
    }

    scale(scale: Point2D) {
        let translateMatrix = this.translateMatrix.clone().scale(scale.x, scale.y);
        this.translate(translateMatrix);
    }

    save() {
        this._saves.push(this.translateMatrix.clone());

    }

    restoreSave() {
        let lastSave = this._saves.pop();
        if (lastSave) {
            this.setCtxTransform(lastSave);
        }
    }


    setCtxTransform(t: TransformMatrix2D) {
        this.ctx.setTransform(t.m11, t.m12, t.m21, t.m22, t.dx, t.dy);
    }

    restoreTranslate() {
        // console.log(`Restoring translate ${this.translates.length}`);
        let lastTranslate = this.popTranslate();
        this.setCtxTransform(lastTranslate);
    }

    get translateMatrix(): TransformMatrix2D {
        return this.translates[this.translates.length - 1];
    }

    popTranslate(): TransformMatrix2D {
        if (this.translates.length > 1) {
            // console.log("pop translate");
            return this.translates.pop() as TransformMatrix2D;
        }
        return this.translates[0];
    }

    _needsRedraw: boolean = true;
    get needsRedraw() {
        return this._needsRedraw;
    }

    set needsRedraw(value: boolean) {
        this._needsRedraw = value;
    }
}
