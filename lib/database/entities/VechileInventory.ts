import Inventory from './Inventory';
import CharacterVehicle from './CharacterVehicle';

export default class VechileInventory {
    public id: number;
    public fk_Inventory_id: number;
    public fk_CharacterVehicle_id: number;
    public CharacterVehicle: CharacterVehicle;
    public Inventory: Inventory;
}
