/**
 * An Element with children
 */
import {CubismElement} from "./CubismElement";
import {Cubism} from "../../Cubism";
import {Point2D} from "../../Utils/Math/Point";
import SizeKeys from "../../Constants/SizeKeys";

export default class CubismParentElement extends CubismElement {
    children: CubismElement[];

    constructor(elementId: string | null = null, ...children: CubismElement[]) {
        super(elementId);
        this.children = [];
        this.addChildren(...children);
    }

    /**
     * Called by initElement.
     * Therefore, no need to overload initElement
     * @param targetSize
     */
    resize(targetSize: Point2D) {
        super.resize(targetSize);
        this.updateChildrenShape()
    }

    /**
     * Updates the children's shape
     */
    updateChildrenShape() {
        this.updateChildrenSize();
        this.updateChildrenPosition();
    }

    /**
     * Updates the children's position
     */
    updateChildrenPosition() {

    }

    /**
     * Updates the children's size according to the layout
     */
    updateChildrenSize() {
        for (let child of this.children) {
            let x = child.width;
            let y = child.height;
            if (x === SizeKeys.MATCH_PARENT) {
                x = this.absWidth;
            }
            if (y === SizeKeys.MATCH_PARENT) {
                y = this.absHeight;
                console.log("this.absHeight", this.absHeight);
            }
            child.resize(new Point2D(x, y));
        }
    }

    /**
     * Adds children to the element
     * @param children
     */
    addChildren(...children: CubismElement[]): this {
        if (children === undefined) {
            console.log("children is undefined");
            return this;
        }
        for (let child of children) {
            this.children.push(child);
            if (this._cubism) {
                child.setCubism(this.cubism);
                this.updateChildrenShape();
            }
        }
        return this;
    }

    /**
     * Removes a child from the element
     * @param child
     */
    removeChild(child: CubismElement): void {
        let index = this.children.indexOf(child);
        if (index > -1) {
            this.children.splice(index, 1);
        }
    }

    /**
     * Removes given children from the element
     * @param children
     */
    removeChildren(children: CubismElement[]): void {
        for (let child of children) {
            this.removeChild(child);
        }
    }

    /**
     * Draws current element and its children
     */
    draw() {
        super.draw();
        this.drawChildren();
    }

    /**
     * Draws the children
     */
    drawChildren() {
        this.c.offset(this.position);
        for (let child of this.children) {
            child.draw();
        }
        this.c.restoreTranslate();
    }

    /**
     * Sets the cubism instance for the element and its children
     * @param cubism
     */
    setCubism(cubism: Cubism) {
        super.setCubism(cubism);
        this.setChildrenCubism(cubism);
    }

    /**
     * Sets the cubism instance for the children
     * @param cubism
     */
    setChildrenCubism(cubism: Cubism) {
        for (let child of this.children) {
            child.setCubism(cubism);
        }
    }
}
