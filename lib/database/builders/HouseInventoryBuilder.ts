import House from '../entities/House';
import HouseInventory from '../entities/HouseInventory';
import Inventory from '../entities/Inventory';
import EntityBuilder from '../EntityBuilder';
import HouseBuilder from './HouseBuilder';
import InventoryBuilder from './InventoryBuilder';

export default class HouseInventoryBuilder extends EntityBuilder {
    protected _entity: HouseInventory;

    public setId(id: number): HouseInventoryBuilder {
        this._entity.id = id;
        return this;
    }

    public setInventoryId(id: number): HouseInventoryBuilder {
        this._entity.fk_Inventory_id = id;
        return this;
    }

    public setHouseId(id: number): HouseInventoryBuilder {
        this._entity.fk_House_id = id;
        return this;
    }

    public setHouse(house: House | HouseBuilder): HouseInventoryBuilder {
        if (house instanceof HouseBuilder) house = <House>house.build();
        this._entity.House = house;
        return this;
    }

    public setInventory(inventory: Inventory | InventoryBuilder): HouseInventoryBuilder {
        if (inventory instanceof InventoryBuilder) inventory = <Inventory>inventory.build();
        this._entity.Inventory = inventory;
        return this;
    }
}
