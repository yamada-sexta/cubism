import {PointerInteractThemeElement} from "./Basic/PointerInteractThemeElement";
import {CubismElement} from "./Basic/CubismElement";
import {Point2D} from "../Utils/Math/Point";
import {cubic, dHermite, hermite} from "../Curve/Curve2D/Cubic";
import {IJMatrix} from "../Utils/Math/NNMatrix";
import PointerHandlerParentElement from "./Basic/PointerHanderParentElement";
import {DraggableCircle} from "./DraggableCircle";

export class CurveElement extends CubismElement {
    _points: IPoint2D[];

    constructor(id: string | null = null, points: IPoint2D[] = []) {
        super(id);
        this._points = points;
    }

    get points() {
        return this._points;
    }


    onCreate() {
        super.onCreate();
        this.width = 500;
        this.height = 500;
    }


    draw() {
        super.draw();

        // let d0 = Point2D.getRandom(400);
        // let d1 = Point2D.getRandom(400);

        for (let p of this.points) {
            this.c.drawPoint(p);
        }

        let step = 0.1;


        let lastD = Point2D.zero;

        for (let i = 0; i < this.points.length - 1; i++) {
            let p0 = Point2D.fromIPoint(this.points[i]);
            let p1 = Point2D.fromIPoint(this.points[i + 1]);
            let t = 0;
            let lastPoint: IPoint2D = p0;

            let d0 = lastD;
            let d1 = null;
            if (i < this.points.length - 2) {
                let p2 = Point2D.fromIPoint(this.points[i + 2]);
                d1 = p2.sub(p0).scale(0.5);
            } else {
                d1 = p1.sub(p0).scale(0.5);
            }

            if (i > 0) {
                let tangent = this.getTangent(t, p0, p1, d0, d1);
                // console.log(`tangent [${i}]: ${tangent.x}, ${tangent.y}`);
                let rotation = - Math.atan2(tangent.y, tangent.x);
                this.c.offsetXY(100, 100);
                // this.c.drawPoint(tangent);
                this.c.restoreTranslate();
                this.c.drawArrow(Point2D.fromIPoint(this.points[i]), rotation, 30);
            }

            while (t < 1) {
                let point = this.getPoint(t, p0, p1, d0, d1);
                // this.c.drawPoint(point, 3);
                this.c.drawLineWithPoints(lastPoint, point);
                lastPoint = point;
                t += step;
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

    getPoint(t: number, p0: IPoint2D, p1: IPoint2D, d0: IPoint2D, d1: IPoint2D): IPoint2D {
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
