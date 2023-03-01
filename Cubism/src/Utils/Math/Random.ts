export class Random {
    _seed: number;

    static i: Random = new Random(0);

    static get instance() {
        return Random.i;
    }

    setSeed(seed: number) {
        this._seed = seed;
    }

    constructor(seed: number) {
        this._seed = seed;
    }

    next() {
        let x = Math.sin(this._seed++) * 10000;
        return x - Math.floor(x);
    }

    nextInt(max: number) {
        return Math.floor(this.next() * max);
    }

    nextIntRange(min: number, max: number) {
        return min + this.nextInt(max - min);
    }

    nextFloat() {
        return this.next();
    }
}
