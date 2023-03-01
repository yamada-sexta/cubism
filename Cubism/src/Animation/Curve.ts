interface IAnimationCurve {
    getDelta(start: number, end: number, t: number): number

}

class LinearCurve implements IAnimationCurve {
    getDelta(start: number, end: number, t: number): number {
        return start + (end - start) * t;
    }
}

class QuadraticCurve implements IAnimationCurve {
    getDelta(start: number, end: number, t: number): number {
        return start + (end - start) * t * t;
    }
}
//
// class CubicCurve implements IAnimationCurve {
//     getDelta(start: number, end: number, t: number): number {
//         return start + (end - start) * t * t * t;
//     }
// }

class NCurve implements IAnimationCurve {
    constructor(private n: number) {

    }

    getDelta(start: number, end: number, t: number): number {
        return start + (end - start) * Math.pow(t, this.n);
    }
}
class LogCurve implements IAnimationCurve {
    getDelta(start: number, end: number, t: number): number {
        return start + (end - start) * Math.log(t);
    }
}
