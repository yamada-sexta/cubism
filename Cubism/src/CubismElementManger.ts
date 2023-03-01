import {CubismElement} from "./Elements/Basic/CubismElement";

export default class CubismElementManger{

    private _elementsWithId: { [key: string]: CubismElement } = {};

    private _elementsWithClass: { [key: string]: CubismElement[] } = {};

    public registerElementId(id: string, element: CubismElement) {
        console.log("registering element with id " + id);
        if (this._elementsWithId[id] === undefined) {
            this._elementsWithId[id] = element;
        } else {
            throw new Error("Element with that id already exists");
        }
    }

    public getElementById(id: string): CubismElement {
        return this._elementsWithId[id];
    }

    public removeElementWithId(id: string) {
        delete this._elementsWithId[id];
    }

    public registerElementClass(className: string, element: CubismElement) {
        if (this._elementsWithClass[className] === undefined) {
            this._elementsWithClass[className] = [];
        }
        this._elementsWithClass[className].push(element);
    }

    public getElementsByClass(className: string): CubismElement[] {
        return this._elementsWithClass[className];
    }

    public removeElementWithClass(className: string, element: CubismElement) {
        this._elementsWithClass[className].splice(this._elementsWithClass[className].indexOf(element), 1);
    }

    public removeClass(className: string) {
        delete this._elementsWithClass[className];
    }
}