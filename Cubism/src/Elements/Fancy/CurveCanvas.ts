import PointerHandlerParentElement from "../Basic/PointerHanderParentElement";
import {PointerPoint} from "../../Datatypes/PointerPoint";
import {Point2D} from "../../Utils/Math/Point";
import {IJMatrix} from "../../Utils/Math/NNMatrix";
import {cubic, dHermite, hermite} from "../../Curve/Curve2D/Cubic";
import {Colors} from "../../Constants/Colors";
import {CubismAnimation} from "../../Animation/Animation";
import {random} from "../../Utils/Math/Math";

export class CurveCanvas extends PointerHandlerParentElement {
    _curves: IPoint2D[][] = [];
    _drawing: boolean = false;

    _isPlayingAnimation: boolean = false;
    animationLength: number = 50;

    circleSize = 20;

    mode = {
        draw: 0,
        move: 1
    }

    _currMode: number = this.mode.draw;

    set currMode(mode: number) {
        console.log("Setting mode to: ", mode);

        this._currMode = mode;
    }

    get currMode() {
        return this._currMode;
    }

    set drawing(drawing: boolean) {
        this._drawing = drawing;
    }

    changeToMoveMode() {
        this.currMode = this.mode.move;
    }

    changeToDrawMode() {
        this.currMode = this.mode.draw;
    }

    get drawing(): boolean {
        return this._drawing;
    }

    onDown(point: PointerPoint) {
        super.onDown(point);
        this.drawing = true;
        if (this._currMode === this.mode.draw) {
            this._curves.push([point.sub(this.position)]);
        }
    }

    onUp(point: PointerPoint) {
        super.onUp(point);
        if (this._currMode === this.mode.draw) {
            this._curves[this._curves.length - 1].push(point.sub(this.position));
            // Add another point to make sure the curve can be animated correctly
            this._curves[this._curves.length - 1].push(point.sub(this.position));
        }


        this.drawing = false;
    }

    playAnimation() {
        console.log("Playing animation");
        if (this._isPlayingAnimation) {
            return;
        }
        if (this._curves.length === 0) {
            return;
        }
        let animation = new CubismAnimation(this.cubism, this.animationLength);
        this._isPlayingAnimation = true;
        animation.setAnimationEvent(this.animationCallback.bind(this));
        animation.setPlaying(true);
        this.c.setRedraw(true);
    }

    animationCallback(t: number) {
        // console.log("Animation callback: ", t);
        if (t === this.animationLength) {
            this._isPlayingAnimation = false;
            return;
        }
        let ratio = t / this.animationLength;

        if (this._curves.length === 0) {
            console.log("No curves");
            return;
        }
        this.c.offset(this.position);
        for (let i = 0; i < this._curves.length; i++) {
            let curve = this._curves[i];


            let currColor = `hsl(${(1 - i / (this._curves.length -1)) * 360}, ${35}%, ${70}%)`;
            this.c.setStrokeStyle(currColor);
            this.drawHermitCurve(curve, ratio);
        }

        this.c.restoreTranslate();
    }

    onMove(point: PointerPoint) {
        super.onMove(point);
        // console.log("Drawing: ", this.drawing);
        let relaPoint = point.sub(this.position);
        if (this.drawing) {
            if (this._currMode === this.mode.draw) {
                let lastCurve = this._curves[this._curves.length - 1];
                let lastPoint = lastCurve[lastCurve.length - 1];
                if (Point2D.fromIPoint(lastPoint).manhattanDistance(relaPoint) > 100) {
                    lastCurve.push(relaPoint);
                }
            }
            if (this._currMode === this.mode.move) {
                let dragPoint = null;
                for (let curve of this._curves) {
                    for (let point of curve) {
                        if (Point2D.fromIPoint(point).euclideanDistance(relaPoint) < this.circleSize) {
                            dragPoint = point;
                            break;
                        }
                    }
                }

                if (dragPoint !== null) {
                    dragPoint.x = relaPoint.x;
                    dragPoint.y = relaPoint.y;
                }
            }
        }
        this.c.setRedraw(true);
    }

    undo() {
        if (this._curves.length > 0) {
            this._curves.pop();
            console.log(this._curves);
            console.log("Undoing");
        }
        this.c.setRedraw(true);
    }

    clear() {
        while (this._curves.length > 0) {
            this.undo();
        }
        this.c.setRedraw(true);
    }

    draw() {

        // console.log("Drawing curves: ", this._curves);
        super.draw();


        this.c.offset(this.position);
        // this.c.setFillStyle("black");
        this.c.setStrokeStyle(Colors.white);
        this.c.setFillStyle(Colors.white);
        this.c.drawRect(0, 0, this.size.x, this.size.y);
        this.c.setStrokeStyle(Colors.black);
        if (this._isPlayingAnimation) {
            // console.log("Is playing");
            this.c.restoreTranslate();
            return;
        }
        if (this.currMode === this.mode.move) {
            this.c.setStrokeStyle(Colors.blue700);
            this.c.setStrokeWidth(3);
        }
        if (this.currMode === this.mode.draw) {
            this.c.setStrokeWidth(4);
        }
        for (let curve of this._curves) {
            this.drawHermitCurve(curve);

            if (this._currMode === this.mode.move) {
                for (let point of curve) {
                    this.c.drawPoint(point, this.circleSize);
                }
            }
        }
        this.c.restoreTranslate();
    }

    drawHermitCurve(points: IPoint2D[], ratio: number = 1) {
        // let step = 0.1;
        let lastD = Point2D.zero;
        let fullEnd = points.length;
        let end = Math.floor(fullEnd * ratio);

        if (fullEnd < 1) {
            return;
        }

        for (let i = 1; i < end; i++) {
            let p0 = Point2D.fromIPoint(points[i - 1]);
            let p1 = Point2D.fromIPoint(points[i]);
            let t = 0;

            let d0 = lastD;
            let d1 = null;
            if (i < end - 3) {
                let p2 = Point2D.fromIPoint(points[i + 1]);
                d1 = p2.sub(p0).scale(0.5);
            } else {
                d1 = p1.sub(p0).scale(0.5);
            }
            let segEnd = 1;
            let isEdge = false;
            if (this._isPlayingAnimation) {
                if (i === end - 1) {
                    isEdge = true;
                    segEnd = (fullEnd * ratio - end);
                }
            }
            let lastPoint: IPoint2D = p0;

            // let step = Math.max(p0.manhattanDistance(p1) / 1000, 0.1);
            // let step = 0.1;
            // console.log("Step: ", step);
            // console.log("Distance: ", p0.manhattanDistance(p1));
            let step = 0.05;
            while (t <= segEnd + step) {
                let point = this.getPoint(t, p0, p1, d0, d1);

                if (this._isPlayingAnimation) {
                    this.c.setStrokeWidth(3);
                }
                this.c.drawLineWithPoints(lastPoint, point);
                lastPoint = point;
                t += step;
            }
            if (this._isPlayingAnimation) {
                let point = this.getPoint(t, p0, p1, d0, d1);
                if (isEdge) {
                    let tangent = this.getTangent(t, p0, p1, d0, d1);
                    // this.c.setStrokeWidth(20);
                    let rotation = -Math.atan2(tangent.y, tangent.x);
                    this.c.setStrokeWidth(2)
                    this.c.setFillStyle(Colors.white);
                    this.c.drawArrow(point, rotation, 20);
                }
            }
            lastD = d1;
        }
    }


    getTangent(t: number, p0: IPoint2D, p1: IPoint2D, d0: IPoint2D, d1: IPoint2D): Point2D {
        let pointMatrix = new IJMatrix(4, 2)
            .set([
                p0.x, p0.y,
                d0.x, d0.y,
                p1.x, p1.y,
                d1.x, d1.y
            ]);
        let out = cubic(dHermite, pointMatrix, t);
        return new Point2D(out.getIJ(0, 0), out.getIJ(0, 1));
    }

    getPoint(t: number, p0: IPoint2D, p1: IPoint2D, d0: IPoint2D, d1: IPoint2D): Point2D {
        let pointMatrix = new IJMatrix(4, 2)
            .set([
                p0.x, p0.y,
                d0.x, d0.y,
                p1.x, p1.y,
                d1.x, d1.y
            ]);
        let out = cubic(hermite, pointMatrix, t);
        return new Point2D(out.getIJ(0, 0), out.getIJ(0, 1));
    }

}
