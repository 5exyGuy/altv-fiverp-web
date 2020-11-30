import Vehicle from './Vehicle';
import Character from './Character';
import VechileInventory from './VechileInventory';
import VehicleProperties from './VehicleProperties';

export default class CharacterVehicle {
    public destroyed: boolean;
    public lastPosition: object;
    public lastRotation: object;
    public fuel: number;
    public dimension: number;
    public lockState: string;
    public numberPlate: string;
    public id: number;
    public fk_Character_id: number;
    public fk_Vehicle_id: number;
    public Character: Character;
    public Vehicle: Vehicle;
    public VechileInventory: VechileInventory[];
    public VehicleProperties: VehicleProperties;
}
