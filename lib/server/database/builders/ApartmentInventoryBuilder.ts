import Apartment from '../entities/Apartment';
import ApartmentInventory from '../entities/ApartmentInventory';
import Inventory from '../entities/Inventory';
import EntityBuilder from '../EntityBuilder';
import ApartmentBuilder from './ApartmentBuilder';
import InventoryBuilder from './InventoryBuilder';

export default class ApartmentInventoryBuilder extends EntityBuilder {
    protected _entity: ApartmentInventory = new ApartmentInventory();

    public setId(id: number): ApartmentInventoryBuilder {
        this._entity.id = id;
        return this;
    }

    public setInventoryId(id: number): ApartmentInventoryBuilder {
        this._entity.fk_Inventory_id = id;
        return this;
    }

    public setApartmentId(id: number): ApartmentInventoryBuilder {
        this._entity.fk_Apartment_id = id;
        return this;
    }

    public setApartment(apartment: Apartment | ApartmentBuilder): ApartmentInventoryBuilder {
        if (apartment instanceof ApartmentBuilder) apartment = <Apartment>apartment.build();
        this._entity.Apartment = apartment;
        return this;
    }

    public setInventory(inventory: Inventory | InventoryBuilder): ApartmentInventoryBuilder {
        if (inventory instanceof InventoryBuilder) inventory = <Inventory>inventory.build();
        this._entity.Inventory = inventory;
        return this;
    }
}
