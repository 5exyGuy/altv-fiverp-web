import Entity from '../Entity';
import ApartmentInventory from './ApartmentInventory';
import BusinessInventory from './BusinessInventory';
import CharacterInventory from './CharacterInventory';
import HouseInventory from './HouseInventory';
import InventoryItem from './InventoryItem';
import VehicleInventory from './VehicleInventory';

export default class Inventory extends Entity<Inventory> {
    public id: number;
    public apartmentInventories: ApartmentInventory[];
    public businessInventories: BusinessInventory[];
    public characterInventories: CharacterInventory[];
    public houseInventories: HouseInventory[];
    public inventoryItems: InventoryItem[];
    public vehicleInventories: VehicleInventory[];
}
