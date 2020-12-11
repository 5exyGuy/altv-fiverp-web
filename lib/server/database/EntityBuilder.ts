import Entity from './Entity';

export default class EntityBuilder {
    protected _entity: Entity = new Entity();

    public build(): Entity {
        return this._entity;
    }
}
