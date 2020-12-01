import ApartmentInventory from './ApartmentInventory';
import BusinessInventory from './BusinessInventory';
import CharacterInventory from './CharacterInventory';
import HouseInventory from './HouseInventory';
import InventoryItem from './InventoryItem';
import VehicleInventory from './VehicleInventory';

export default class Inventory {
    public id: number;
    public ApartmentInventory: ApartmentInventory[];
    public BusinessInventory: BusinessInventory[];
    public CharacterInventory: CharacterInventory[];
    public HouseInventory: HouseInventory[];
    public InventoryItem: InventoryItem[];
    public VehicleInventory: VehicleInventory[];
}
