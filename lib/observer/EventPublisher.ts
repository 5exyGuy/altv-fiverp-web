import EventSubscriber from './EventSubscriber';

export default class EventPublisher {
    private _eventName: string;
    private _subscribers: Array<EventSubscriber>;

    public constructor(eventName: string) {
        this._eventName = eventName;
    }

    public get eventName(): string {
        return this._eventName;
    }

    public subscribe(subscriber: EventSubscriber) {
        if (this._subscribers.includes(subscriber)) return;
        this._subscribers.push(subscriber);
    }

    public unsubscribe(subscriber: EventSubscriber) {
        const subIndex: number = this._subscribers.indexOf(subscriber);
        if (subIndex === -1) return;
        this._subscribers.splice(subIndex, 1);
    }

    public notify(): void {
        this._subscribers.forEach((sub) => sub.update(this));
    }
}
