import { BaseEntity } from 'typeorm';

export default class EntityBuilder {
    protected _entity: BaseEntity = new BaseEntity();

    public build(): BaseEntity {
        return this._entity;
    }
}
