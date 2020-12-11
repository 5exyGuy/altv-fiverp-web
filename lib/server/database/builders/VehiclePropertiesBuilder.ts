import CharacterVehicle from '../entities/CharacterVehicle';
import VehicleProperties from '../entities/VehicleProperties';
import EntityBuilder from '../EntityBuilder';
import CharacterVehicleBuilder from './CharacterVehicleBuilder';

export default class VehiclePropertiesBuilder extends EntityBuilder {
    protected _entity: VehicleProperties = new VehicleProperties();

    public setId(id: number): VehiclePropertiesBuilder {
        this._entity.id = id;
        return this;
    }

    public setCharacterVehicleId(id: number): VehiclePropertiesBuilder {
        this._entity.fk_CharacterVehicle_id = id;
        return this;
    }

    public setCharacterVehicle(characterVehicle: CharacterVehicle | CharacterVehicleBuilder): VehiclePropertiesBuilder {
        if (characterVehicle instanceof CharacterVehicleBuilder)
            characterVehicle = <CharacterVehicle>characterVehicle.build();
        this._entity.CharacterVehicle = characterVehicle;
        return this;
    }
}
