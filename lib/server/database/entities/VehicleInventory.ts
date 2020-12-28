import Inventory from './Inventory';
import CharacterVehicle from './CharacterVehicle';
import Entity from '../Entity';

export default class VehicleInventory extends Entity<VehicleInventory> {
    public id: number;
    public fkCharacterVehicleId: number;
    public fkInventoryId: number;
    public fkCharacterVehicle: CharacterVehicle;
    public fkInventory: Inventory;
}
