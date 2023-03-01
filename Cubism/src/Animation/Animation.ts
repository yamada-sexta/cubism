import IAnimation from "./IAnimation";
import {CubismElement} from "../Elements/Basic/CubismElement";
import {EventKeys} from "../Constants/EventKeys";
import {Point2D} from "../Utils/Math/Point";
import CubismPart from "../CubismPart";
import {Cubism} from "../Cubism";

export class CubismAnimation extends CubismPart implements IAnimation {
    _isPlaying: boolean = false;
    _endFrame: number;
    _currFrame: number = 0;

    _animationCallBacks: ((frame: number) => void)[] = [];

    constructor(cubism:Cubism, endFrame: number = 0) {
        super();
        this.setCubism(cubism);
        this._endFrame = endFrame;
    }

    setPlaying(playing: boolean): this {
        this._isPlaying = playing;
        if (playing) {
            this.cubism.initializer.initializeAlwaysRedraw();
            this.cubism.eventSystem.registerEvent(EventKeys.FRAME_UPDATE, this.play.bind(this));
        }
        return this;
    }

    setAnimationEvent(callback: (frame: number) => void) {
        this._animationCallBacks.push(callback);
    }

    onAnimationUpdate() {
        for (const callback of this._animationCallBacks) {
            callback(this._currFrame);
        }
    }

    play(): void {
        // console.log("Playing animation");
        // console.log(`Current frame: ${this._currFrame}`);
        this.onAnimationUpdate();
        this._currFrame++;

        if (this._currFrame > this._endFrame) {
            this._isPlaying = false;
            this._currFrame = 0;

            this.cubism.initializer.stopAlwaysRedraw();
        }
    }
}
