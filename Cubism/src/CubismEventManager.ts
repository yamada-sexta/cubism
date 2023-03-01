import {CubismEventSystem} from "./Events/CubismEventSystem";
import IGlobalHandler from "./Interface/IGlobalHandler";
import IHasCubism from "./Interface/IGlobalHandler";
import CubismPart from "./CubismPart";
import {triggerAsyncId} from "async_hooks";
import {EventKeys} from "./Constants/EventKeys";

export default class CubismEventManager extends CubismPart {
    get eventSystem(): CubismEventSystem {
        return this.cubism.eventSystem;
    }

    /**
     * Initialize a fix update
     * @param timeInterval
     */
    initializeFixedUpdate(timeInterval: number = 1000 / 60) {
        setInterval(this.doFixUpdate.bind(this), timeInterval);
        return this;
    }

    doFixUpdate() {
        this.eventSystem.triggerEvent(EventKeys.FIX_UPDATE);
    }

    /**
     * Initialize the frame update
     */
    public initializeFrameUpdate() {
        this.eventSystem.triggerEvent(EventKeys.FRAME_UPDATE);
        window.requestAnimationFrame(this.doFrameUpdate.bind(this));
        return this;
    }

    doFrameUpdate() {
        this.eventSystem.triggerEvent(EventKeys.FRAME_UPDATE);
        window.requestAnimationFrame(this.doFrameUpdate.bind(this));
    }

    /**
     * Initialize the second update
     */
    public initializeSecondUpdate() {
        setInterval(this.triggerSecondUpdate.bind(this), 1000);
        return this;
    }

    triggerSecondUpdate() {
        this.eventSystem.triggerEvent(EventKeys.SECOND_UPDATE);
    }

    /**
     * Initialize the FPS counter
     */
    public initializeFPSCounter() {
        if (!this.eventSystem.hasEvent(EventKeys.SECOND_UPDATE)) {
            this.initializeSecondUpdate();
        }
        if (!this.eventSystem.hasEvent(EventKeys.FRAME_UPDATE)) {
            this.initializeFrameUpdate();
        }
        this.eventSystem.registerEvent(EventKeys.SECOND_UPDATE, this.triggerFPSUpdate.bind(this));
        this.eventSystem.registerEvent(EventKeys.FRAME_UPDATE, this.incrementFrameCount.bind(this));
        return this;
    }

    frameCount: number = 0;

    triggerFPSUpdate() {
        this.eventSystem.triggerEvent(EventKeys.FPS_UPDATE, this.frameCount);
        this.frameCount = 0;
    }

    incrementFrameCount() {
        this.frameCount++;
    }

    /**
     * Update canvas every frame
     */
    public initializeAlwaysRedraw() {
        this.eventSystem.registerEvent(EventKeys.FRAME_UPDATE, this.triggerRedraw.bind(this));
        return this;
    }

    triggerRedraw() {
        this.eventSystem.triggerEvent(EventKeys.REDRAW);
    }

    /**
     * Stop always redraw
     */
    public stopAlwaysRedraw() {
        this.eventSystem.unregisterEvent(EventKeys.FRAME_UPDATE, this.triggerRedraw.bind(this));
        return this;
    }

    /**
     * Initialize the draw count counter
     */
    public initializeDrawsPerSecondCounter() {
        this.eventSystem.registerEvent(EventKeys.REDRAW, this.onRedraw.bind(this));
        if (!this.eventSystem.hasEvent(EventKeys.SECOND_UPDATE)) {
            this.initializeSecondUpdate();
        }
        this.eventSystem.registerEvent(EventKeys.SECOND_UPDATE, this.doDrawCountUpdate.bind(this));
        return this;
    }

    drawCount: number = 0;

    onRedraw() {
        this.drawCount++;
    }

    doDrawCountUpdate() {
        this.eventSystem.triggerEvent(EventKeys.DRAW_COUNT_UPDATE, this.drawCount);
        this.drawCount = 0;
    }
}
