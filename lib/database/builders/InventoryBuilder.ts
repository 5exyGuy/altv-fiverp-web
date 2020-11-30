import Inventory from '../entities/Inventory';
import EntityBuilder from '../EntityBuilder';

export default class InventoryBuilder extends EntityBuilder {
    protected _entity: Inventory;

    public setId(id: number): InventoryBuilder {
        this._entity.id = id;
        return this;
    }
}
