import EntityBuilder from './EntityBuilder';

export default class EntityManager {
    private _builder: EntityBuilder;

    public constructor(builder: EntityBuilder) {
        this._builder = builder;
    }
}
