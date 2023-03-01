import {IJMatrix} from "../../Utils/Math/NNMatrix";

export function cubic(cubicFunctionBasis: (n: number) => IJMatrix, pointMatrix: IJMatrix, t: number) {
    let b = cubicFunctionBasis(t);
    let result = new IJMatrix(1, 2);
    for (let i = 0; i < 4; i++) {
        result.setIJ(0, 0, result.getIJ(0, 0) + pointMatrix.getIJ(i, 0) * b.getIJ(0, i));
        result.setIJ(0, 1, result.getIJ(0, 1) + pointMatrix.getIJ(i, 1) * b.getIJ(0, i));
    }
    return result;
}

export function hermite(t: number) {
    return new IJMatrix(1, 4)
        .set([2 * t * t * t - 3 * t * t + 1,
            t * t * t - 2 * t * t + t,
            -2 * t * t * t + 3 * t * t,
            t * t * t - t * t]
        );
}

export function bezier(t: number) {
    return new IJMatrix(1, 4)
        .set([Math.pow(1 - t, 3),
            3 * t * Math.pow(1 - t, 2),
            3 * Math.pow(t, 2) * (1 - t),
            Math.pow(t, 3)]
        );
}

export function bSpline(t: number) {
    return new IJMatrix(1, 4)
        .set([Math.pow(1 - t, 3) / 6,
            (3 * t * t * t - 6 * t * t + 4) / 6,
            (-3 * t * t * t + 3 * t * t + 3 * t + 1) / 6,
            t * t * t / 6]
        );
}


export function dHermite(t: number) {
    return new IJMatrix(1, 4)
        .set(
            [
                6 * t ** 2 - 6 * t,
                3 * t ** 2 - 4 * t + 1,
                -6 * t ** 2 + 6 * t,
                3 * t ** 2 - 2 * t
            ]
        );
}
