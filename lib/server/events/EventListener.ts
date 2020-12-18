export default interface EventSubscriber {
    update(...args: Array<any>): void;
}
