import Inventory from './Inventory';
import CharacterVehicle from './CharacterVehicle';
import Entity from '../Entity';

export default class VehicleInventory extends Entity {
    public id: number;
    public fk_Inventory_id: number;
    public fk_CharacterVehicle_id: number;
    public CharacterVehicle: CharacterVehicle;
    public Inventory: Inventory;
}
