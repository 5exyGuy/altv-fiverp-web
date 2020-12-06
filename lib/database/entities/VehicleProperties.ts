import Entity from '../Entity';
import CharacterVehicle from './CharacterVehicle';

export default class VehicleProperties extends Entity {
    public id: number;
    public fk_CharacterVehicle_id: number;
    public CharacterVehicle: CharacterVehicle;
}
