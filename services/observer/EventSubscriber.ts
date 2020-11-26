import EventPublisher from './EventPublisher';

export default interface EventSubscriber {
    update(context: EventPublisher): void;
}
