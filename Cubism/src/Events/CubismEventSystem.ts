import IHasCubism from "../Interface/IGlobalHandler";
import CubismPart from "../CubismPart";
import IEventManger from "../Interface/IEventManger";

/**
 * System that handles the registration and trigger of global events
 */
export class CubismEventSystem extends CubismPart implements IEventManger {
    private _globalEventListeners: { [key: string]: Function[] } = {};

    getEvent(event: string): Function[] {
        if (this._globalEventListeners[event] === undefined) {
            this._globalEventListeners[event] = [];
            this._globalEventListeners[event].push(() => {
                // Log.logDebug(`Event ${event} triggered`);
            });
        }
        return this._globalEventListeners[event];
    }

    registerEvent(eventKey: string, callback: Function): void {
        this.getEvent(eventKey).push(callback);
    }

    triggerEvent(eventKey: string, ...args: any[]): void {
        this.getEvent(eventKey).forEach((callback) => {
            callback(...args);
        });
    }

    unregisterEvent(eventKey: string, callback: Function): void {
        this._globalEventListeners[eventKey].splice(this._globalEventListeners[eventKey].indexOf(callback), 1);
    }

    removeEvent(event: string) {
        this._globalEventListeners[event] = [];
    }

    removeAllEvents() {
        for (const event in this._globalEventListeners) {
            this.removeEvent(event);
        }
        this._globalEventListeners = {};
    }

    hasEvent(event: string): boolean {
        return this._globalEventListeners[event] !== undefined;
    }
}
