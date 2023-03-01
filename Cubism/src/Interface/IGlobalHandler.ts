
import {Cubism} from "../Cubism";

export default interface ICubismPart {
    get cubism(): Cubism;
    set cubism(cubism: Cubism);
}
