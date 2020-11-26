import Entity from './Entity';

export default interface EntityBuilder {
    build(): Entity;
    save(): void;
}
