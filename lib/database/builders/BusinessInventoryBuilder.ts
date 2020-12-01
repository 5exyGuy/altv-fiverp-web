import Business from '../entities/Business';
import BusinessInventory from '../entities/BusinessInventory';
import Inventory from '../entities/Inventory';
import EntityBuilder from '../EntityBuilder';
import BusinessBuilder from './BusinessBuilder';
import InventoryBuilder from './InventoryBuilder';

export default class BusinessInventoryBuilder extends EntityBuilder {
    protected _entity: BusinessInventory;

    public setId(id: number): BusinessInventoryBuilder {
        this._entity.id = id;
        return this;
    }

    public setInventoryId(id: number): BusinessInventoryBuilder {
        this._entity.fk_Inventory_id = id;
        return this;
    }

    public setBusinessId(id: number): BusinessInventoryBuilder {
        this._entity.fk_Business_id = id;
        return this;
    }

    public setBusiness(business: Business | BusinessBuilder): BusinessInventoryBuilder {
        if (business instanceof BusinessBuilder) business = <Business>business.build();
        this._entity.Business = business;
        return this;
    }

    public setInventory(inventory: Inventory | InventoryBuilder): BusinessInventoryBuilder {
        if (inventory instanceof InventoryBuilder) inventory = <Inventory>inventory.build();
        this._entity.Inventory = inventory;
        return this;
    }
}
