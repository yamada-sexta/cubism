import {CubismEventSystem} from "../../Events/CubismEventSystem";
import {Cubism} from "../../Cubism";

/**
 * The global manager for Cubism outside the canvas
 * This is a singleton class
 */
export class CubismOuterGlobal {
    private static _instance: CubismOuterGlobal;

    private constructor() {
    }

    public static get instance(): CubismOuterGlobal {
        if (!CubismOuterGlobal._instance) {
            CubismOuterGlobal._instance = new CubismOuterGlobal();
        }
        return CubismOuterGlobal._instance;
    }

    private _cubismInstances: { [key: string]: Cubism } = {};

    public static getCubismInstance(key: string): Cubism {
        return CubismOuterGlobal.instance._cubismInstances[key];
    }

    public static registerCubismInstance(key: string, app: Cubism) {
        if (CubismOuterGlobal.instance._cubismInstances[key] === undefined) {
            CubismOuterGlobal.instance._cubismInstances[key] = app;
        } else {
            console.log("Replacing cubism instance with key " + key);
            this.getCubismInstance(key).destroy();
            CubismOuterGlobal.instance._cubismInstances[key] = app;
            // throw new Error("Cubism app with key [" + key + "] already exists");
        }
    }
}