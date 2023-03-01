export class IJMatrix {
    arr: number[][];

    constructor(rows: number, cols: number) {
        this.arr = [];
        for (let i = 0; i < rows; i++) {
            this.arr.push([]);
            for (let j = 0; j < cols; j++) {
                this.arr[i].push(0);
            }
        }
    }

    setIJ(i: number, j: number, value: number) {
        this.arr[i][j] = value;
        return this;
    }

    getIJ(i: number, j: number):number {
        return this.arr[i][j];

    }

    set(arr: number[]) {
        let i = 0;
        for (let row of this.arr) {
            for (let j = 0; j < row.length; j++) {
                row[j] = arr[i];
                i++;
            }
        }
        return this;
    }
    setFrom2DArray(arr: number[][]) {
        this.arr = arr;
        return this;
    }

    multiply(other: IJMatrix) {
        let result = new IJMatrix(this.arr.length, other.arr[0].length);
        for (let i = 0; i < this.arr.length; i++) {
            for (let j = 0; j < other.arr[0].length; j++) {
                for (let k = 0; k < this.arr[0].length; k++) {
                    result.arr[i][j] += this.arr[i][k] * other.arr[k][j];
                }
            }
        }
        return result;
    }
}
