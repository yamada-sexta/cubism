import {CubicCurve} from "./CubicCurve";

class HermiteCubic extends CubicCurve {
    constructor() {
        super();
        this.set(
            [1, 0, 0, 0,
                0, 0, 1, 0,
                -3, 3, -2, -1,
                2, -2, 1, 1]
        )
    }

    basicFunction0(t: number) {
        return 2 * t ** 3 - 3 * t ** 2 + 1;
    }

    basicFunction1(t: number) {
        return t ** 3 - 2 * t ** 2 + t;
    }

    basicFunction2(t: number) {
        return -2 * t ** 3 + 3 * t ** 2;
    }

    basicFunction3(t: number) {
        return t ** 3 - t ** 2;
    }

    dBasicFunction0(t: number) {
        return 6 * t ** 2 - 6 * t;
    }
    dBasisFunction1(t: number) {
         return 3* t ** 2 - 4 * t + 1;
    }
    dBasisFunction2(t: number) {
        return -6 * t ** 2 + 6 * t;
    }
    dBasisFunction3(t: number) {
        return 3 * t ** 2 - 2 * t;
    }

    getTangent(t: number, p0: IPoint2D, p1: IPoint2D, d0: IPoint2D, d1: IPoint2D) {

    }

    /**
     * We specify
     * Beginning and ending positions p0, p1
     * Beginning and ending tangents d0, d1
     * @param t 0-1
     * @param p0 Beginning position
     * @param p1 Ending position
     * @param d0 Beginning tangent
     * @param d1 Ending tangent
     */
    getPoint(t: number, p0: IPoint2D, p1: IPoint2D, d0: IPoint2D, d1: IPoint2D) {
        // f(u) = uBP
        // B = [1,0, 0, 0 ; 0, 0, 1, 0; -3, 3, -2, -1; 2, -2, 1, 1]
        // P = [p0, d0, p1, d1]
        // f(u) = uBP = [u^3, u^2, u, 1] * B * P
    }
}
