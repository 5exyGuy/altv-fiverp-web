import CharacterVehicle from '../entities/CharacterVehicle';
import Inventory from '../entities/Inventory';
import VehicleInventory from '../entities/VehicleInventory';
import EntityBuilder from '../EntityBuilder';
import CharacterVehicleBuilder from './CharacterVehicleBuilder';
import InventoryBuilder from './InventoryBuilder';

export default class VehicleInventoryBuilder extends EntityBuilder {
    protected _entity: VehicleInventory = new VehicleInventory();

    public setId(id: number): VehicleInventoryBuilder {
        this._entity.id = id;
        return this;
    }

    public setInventoryId(id: number): VehicleInventoryBuilder {
        this._entity.fk_Inventory_id = id;
        return this;
    }

    public setCharacterVehicleId(id: number): VehicleInventoryBuilder {
        this._entity.fk_CharacterVehicle_id = id;
        return this;
    }

    public setCharacterVehicle(characterVehicle: CharacterVehicle | CharacterVehicleBuilder): VehicleInventoryBuilder {
        if (characterVehicle instanceof CharacterVehicleBuilder)
            characterVehicle = <CharacterVehicle>characterVehicle.build();
        this._entity.CharacterVehicle = characterVehicle;
        return this;
    }

    public setInventory(inventory: Inventory | InventoryBuilder): VehicleInventoryBuilder {
        if (inventory instanceof InventoryBuilder) inventory = <Inventory>inventory.build();
        this._entity.Inventory = inventory;
        return this;
    }
}
