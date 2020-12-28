import Entity from '../Entity';
import CharacterVehicle from './CharacterVehicle';

export default class VehicleProperties extends Entity<VehicleProperties> {
    public id: number;
    public fkCharacterVehicleId: number;
    public fkCharacterVehicle: CharacterVehicle;
}
