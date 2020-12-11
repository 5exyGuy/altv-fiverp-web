import Vehicle from './Vehicle';
import Character from './Character';
import VechileInventory from './VehicleInventory';
import VehicleProperties from './VehicleProperties';
import Entity from '../Entity';

export default class CharacterVehicle extends Entity {
    public destroyed: boolean;
    public lastPosition: string;
    public lastRotation: string;
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
