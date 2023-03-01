export default interface IEventManger {
    /**
     * Register a event
     * @param eventKey the key of the event
     * @param callback the callback to call when the event is triggered
     */
    registerEvent(eventKey: string, callback: Function): void;

    /**
     * Unregister a event
     * @param eventKey
     * @param callback
     */
    unregisterEvent(eventKey: string, callback: Function): void;

    // /**
    //  * Get all callbacks for a event
    //  * @param eventKey
    //  */
    // getEvent(eventKey: string): Function[];

    /**
     * Trigger an event
     * @param eventKey
     * @param args
     */
    triggerEvent(eventKey: string, ...args: any[]): void;
}