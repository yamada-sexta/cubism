import { Point2D } from "../Math/Point";
import {CubismOuterGlobal} from "../../Global/Outer/CubismOuterGlobal";

export function initConsole() {
    let w = window as any;
    w.test = () => {
        console.log('test');
    }
    w.cubismGlobal = CubismOuterGlobal.instance;
    w.root = CubismOuterGlobal.getCubismInstance("mainCanvas").rootElement;
}
