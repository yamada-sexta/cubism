import {CubismCanvasDrawer} from "./Drawer/CubismCanvasDrawer";
import {CubismEventSystem} from "./Events/CubismEventSystem";
import {EventKeys} from "./Constants/EventKeys";
import {Point2D} from "./Utils/Math/Point";
import {PointerPoint} from "./Datatypes/PointerPoint";
import {CubismOuterGlobal} from "./Global/Outer/CubismOuterGlobal";
import CubismPart from "./CubismPart";
import CubismElementManger from "./CubismElementManger";
import {CubismElement} from "./Elements/Basic/CubismElement";
import CubismEventManager from "./CubismEventManager";

/**
 * Entry point of the application
 * Initializes different parts of the application
 */
export class Cubism extends CubismElementManger {
    _root: CubismElement | null = null;
    readonly canvas: HTMLCanvasElement;
    readonly cubismId: string;
    readonly canvasDrawer: CubismCanvasDrawer;
    readonly eventSystem: CubismEventSystem;

    get width() {
        return this.canvas.width;
    }
    set width(width: number) {
        this.canvas.width = width;
    }
    get height() {
        return this.canvas.height;
    }
    set height(height: number) {
        this.canvas.height = height;
    }

    _initializer: CubismEventManager;
    get initializer() {
        return this._initializer;
    }

    get rootElement(): CubismElement {
        if (this._root === null) {
            throw new Error("Root is not set");
        }
        return this._root;
    }

    set rootElement(root) {

        this.initParts(root);
        this._root = root;
    }


    constructor(canvas: HTMLCanvasElement) {
        super();
        this.canvas = canvas;
        this.eventSystem = new CubismEventSystem();
        this.canvasDrawer = new CubismCanvasDrawer(canvas);
        this._initializer = new CubismEventManager();

        this.initParts(this.canvasDrawer, this.eventSystem, this.initializer);
        this.registerRedraw();
        this.registerGlobalPointerEvents();


        if (canvas.id === null || canvas.id === undefined || canvas.id === "") {
            throw new Error("Canvas must have an id");
        }
        this.cubismId = canvas.id;

        CubismOuterGlobal.registerCubismInstance(this.cubismId, this);
    }


    /**
     * Register pointer events
     */
    registerGlobalPointerEvents() {
        // on move
        this.canvas.onpointermove = (e) => {
            // console.log("onpointermove");
            this.eventSystem.triggerEvent(EventKeys.ON_POINTER_EVENT, new PointerPoint(e.offsetX, e.offsetY, e.pressure));
        }
        // on down
        this.canvas.onpointerdown = (e) => {
            this.eventSystem.triggerEvent(EventKeys.ON_POINTER_EVENT, new PointerPoint(e.offsetX, e.offsetY, e.pressure));
        }
        // on up
        this.canvas.onpointerup = (e) => {
            this.eventSystem.triggerEvent(EventKeys.ON_POINTER_EVENT, new PointerPoint(e.offsetX, e.offsetY, e.pressure));
        }
    }

    registerRootElementPointerEvents() {

        this.eventSystem.registerEvent(EventKeys.ON_POINTER_EVENT, (point: PointerPoint) => {
            // console.log(`Pointer event [${point}]`);
            this.rootElement.triggerEvent(EventKeys.ON_POINTER_EVENT, point);
        });

    }

    registerRedraw() {
        this.eventSystem.registerEvent(EventKeys.REDRAW, this.redraw.bind(this));
    }

    // registerOnMove() {
    //     this.eventSystem.registerEvent(EventKeys.ON_MOVE, this.registerOnMove.bind(this));
    // }

    /**
     * Create a new Cubism object from a canvas object
     * @param canvas the canvas to draw on
     */
    static createFromCanvas(canvas: HTMLCanvasElement) {
        return new Cubism(canvas);
    }

    /**
     * Create a new Cubism object from a canvas id
     * @param id the id of the canvas
     */
    static createFromId(id: string) {
        return Cubism.createFromCanvas(document.getElementById(id) as HTMLCanvasElement);
    }

    init(root: CubismElement) {
        this.rootElement = root;
        this.initRootElement();
        this.initializer.initializeFrameUpdate();

        this.registerRootElementPointerEvents();
        this.canvasDrawer.setRedraw(true);
    }

    private initRootElement() {
        console.log("init root element");
        this.rootElement.resize(
            new Point2D(this.canvas.width, this.canvas.height)
        );
    }

    /**
     * Redraw the whole canvas from the root element
     */
    redraw() {
        // console.log("Redrawing");
        this.canvasDrawer.clear();
        if (this.rootElement) {
            this.rootElement.draw();
        }
    }

    initParts(...parts: CubismPart[]) {
        parts.forEach(part => {
                part.cubism = this;
                // console.log(`Initializing cubism part [${part}]`);
            }
        );
    }

    destroy() {
        console.log(`Destroying [${this}]`);
        this.eventSystem.removeAllEvents();

        this.canvasDrawer.clear();
    }

    toString() {
        return `Cubism [${this.cubismId}]`;
    }
}

