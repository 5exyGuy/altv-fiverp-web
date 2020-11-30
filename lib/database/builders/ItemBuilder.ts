import Item from '../entities/Item';
import EntityBuilder from '../EntityBuilder';

export default class ItemBuilder extends EntityBuilder {
    protected _entity: Item;

    public setName(name: string): ItemBuilder {
        this._entity.name = name;
        return this;
    }

    public setHash(hash: string): ItemBuilder {
        this._entity.hash = hash;
        return this;
    }

    public setWeight(weight: number): ItemBuilder {
        this._entity.weight = weight;
        return this;
    }

    public setId(id: number): ItemBuilder {
        this._entity.id = id;
        return this;
    }
}
