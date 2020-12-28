import Vehicle from './Vehicle';
import Character from './Character';
import VechileInventory from './VehicleInventory';
import VehicleProperties from './VehicleProperties';
import Entity from '../Entity';

export default class CharacterVehicle extends Entity<CharacterVehicle> {
    public destroyed: boolean;
    public lastPosition: string;
    public lastRotation: string;
    public fuel: number;
    public dimension: number;
    public locked: boolean;
    public numberPlate: string;
    public id: number;
    public fkVehicleId: number;
    public fkCharacterId: number;
    public fkVehicle: Vehicle;
    public fkCharacter: Character;
    public vechileInventory: VechileInventory;
    public vehicleProperties: VehicleProperties;
}
