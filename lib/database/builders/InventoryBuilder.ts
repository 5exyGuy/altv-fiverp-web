import ApartmentInventory from '../entities/ApartmentInventory';
import BusinessInventory from '../entities/BusinessInventory';
import CharacterInventory from '../entities/CharacterInventory';
import HouseInventory from '../entities/HouseInventory';
import Inventory from '../entities/Inventory';
import InventoryItem from '../entities/InventoryItem';
import VehicleInventory from '../entities/VehicleInventory';
import EntityBuilder from '../EntityBuilder';
import ApartmentInventoryBuilder from './ApartmentInventoryBuilder';
import BusinessInventoryBuilder from './BusinessInventoryBuilder';
import CharacterInventoryBuilder from './CharacterInventoryBuilder';
import HouseInventoryBuilder from './HouseInventoryBuilder';
import InventoryItemBuilder from './InventoryItemBuilder';
import VehicleInventoryBuilder from './VehicleInventoryBuilder';

export default class InventoryBuilder extends EntityBuilder {
    protected _entity: Inventory = new Inventory();

    public setId(id: number): InventoryBuilder {
        this._entity.id = id;
        return this;
    }

    public addApartmentInventory(apartmentInventory: ApartmentInventory | ApartmentInventoryBuilder): InventoryBuilder {
        if (!this._entity.ApartmentInventory) this._entity.ApartmentInventory = new Array<ApartmentInventory>();
        if (apartmentInventory instanceof ApartmentInventoryBuilder)
            apartmentInventory = <ApartmentInventory>apartmentInventory.build();
        this._entity.ApartmentInventory.push(apartmentInventory);
        return this;
    }

    public addBusinessInventory(businessInventory: BusinessInventory | BusinessInventoryBuilder): InventoryBuilder {
        if (!this._entity.BusinessInventory) this._entity.BusinessInventory = new Array<BusinessInventory>();
        if (businessInventory instanceof BusinessInventoryBuilder)
            businessInventory = <BusinessInventory>businessInventory.build();
        this._entity.BusinessInventory.push(businessInventory);
        return this;
    }

    public addCharacterInventory(characterInventory: CharacterInventory | CharacterInventoryBuilder): InventoryBuilder {
        if (!this._entity.CharacterInventory) this._entity.CharacterInventory = new Array<CharacterInventory>();
        if (characterInventory instanceof CharacterInventoryBuilder)
            characterInventory = <CharacterInventory>characterInventory.build();
        this._entity.CharacterInventory.push(characterInventory);
        return this;
    }

    public addHouseInventory(houseInventory: HouseInventory | HouseInventoryBuilder): InventoryBuilder {
        if (!this._entity.HouseInventory) this._entity.HouseInventory = new Array<HouseInventory>();
        if (houseInventory instanceof HouseInventoryBuilder) houseInventory = <HouseInventory>houseInventory.build();
        this._entity.HouseInventory.push(houseInventory);
        return this;
    }

    public addInventoryItem(inventoryItem: InventoryItem | InventoryItemBuilder): InventoryBuilder {
        if (!this._entity.InventoryItem) this._entity.InventoryItem = new Array<InventoryItem>();
        if (inventoryItem instanceof InventoryItemBuilder) inventoryItem = <InventoryItem>inventoryItem.build();
        this._entity.InventoryItem.push(inventoryItem);
        return this;
    }

    public addVechileInventory(vehicleInventory: VehicleInventory | VehicleInventoryBuilder): InventoryBuilder {
        if (!this._entity.VehicleInventory) this._entity.VehicleInventory = new Array<VehicleInventory>();
        if (vehicleInventory instanceof VehicleInventoryBuilder)
            vehicleInventory = <VehicleInventory>vehicleInventory.build();
        this._entity.VehicleInventory.push(vehicleInventory);
        return this;
    }
}
