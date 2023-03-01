import IHasCubism from "./Interface/IGlobalHandler";
import {Cubism} from "./Cubism";

export default class CubismPart implements IHasCubism {
    _cubism: Cubism | null = null;
    get cubism(): Cubism {
        return this.getCubism();
    }
    /**
     * It seems like setter has some problems with overriding
     * @param cubism
     */
    set cubism(cubism: Cubism) {
        this.setCubism(cubism);
    }

    /**
     * Called by setter
     * @param cubism
     */
    setCubism(cubism: Cubism) {
        this._cubism = cubism;
    }

    /**
     * Called by getter
     */
    getCubism(): Cubism {
        if (this._cubism === null) {
            throw new Error(`Cubism is not set for ${this.className}`);
        }
        return this._cubism as Cubism;
    }

    get className(): string {
        return this.constructor.name;
    }

    toString(): string {
        return `${this.className}(${(this._cubism ===null) ? this._cubism : "NO CUBISM"})`;
    }
}