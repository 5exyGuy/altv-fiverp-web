import EventListener from './EventListener';

export default class EventManager {
    private _subscribers: Map<string, Array<EventListener>> = new Map();

    public subscribe(eventType: string, listener: EventListener): void {
        if (!this._subscribers) this._subscribers = new Map();
        let listeners: Array<EventListener> = this._subscribers.get(eventType);
        if (!listeners) listeners = new Array();
        listeners.push(listener);
        this._subscribers.set(eventType, listeners);
    }

    public unsubscribe(eventType: string, listener: EventListener): void {
        const listeners: Array<EventListener> = this._subscribers.get(eventType);
        if (!listeners) return;
        const listenerIndex: number = listeners.indexOf(listener);
        if (listenerIndex > -1) listeners.splice(listenerIndex, 1);
        this._subscribers.set(eventType, listeners);
    }

    public notify(eventType: string, ...args: Array<any>): void {
        const listeners: Array<EventListener> = this._subscribers.get(eventType);
        if (!listeners) return;
        for (const listener of listeners) listener.update(args);
    }

    private static _instance: EventManager = new EventManager();

    public static get instance(): EventManager {
        return this._instance;
    }
}
