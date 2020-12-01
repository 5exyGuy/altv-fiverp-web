import Character from '../entities/Character';
import CharacterVehicle from '../entities/CharacterVehicle';
import Vehicle from '../entities/Vehicle';
import VehicleProperties from '../entities/VehicleProperties';
import VehicleInventory from '../entities/VehicleInventory';
import EntityBuilder from '../EntityBuilder';
import CharacterBuilder from './CharacterBuilder';
import VehicleBuilder from './VehicleBuilder';
import VehiclePropertiesBuilder from './VehiclePropertiesBuilder';
import VehicleInventoryBuilder from './VehicleInventoryBuilder';

export default class CharacterVehicleBuilder extends EntityBuilder {
    protected _entity: CharacterVehicle;

    public setDestroyed(destroyed: boolean): CharacterVehicleBuilder {
        this._entity.destroyed = destroyed;
        return this;
    }

    public setLastPosition(lastPosition: string): CharacterVehicleBuilder {
        this._entity.lastPosition = lastPosition;
        return this;
    }

    public setLastRotation(lastRotation: string): CharacterVehicleBuilder {
        this._entity.lastRotation = lastRotation;
        return this;
    }

    public setFuel(fuel: number): CharacterVehicleBuilder {
        this._entity.fuel = fuel;
        return this;
    }

    public setDimension(dimension: number): CharacterVehicleBuilder {
        this._entity.dimension = dimension;
        return this;
    }

    public setLockState(lockState: string): CharacterVehicleBuilder {
        this._entity.lockState = lockState;
        return this;
    }

    public setNumberPlate(numberPlate: string): CharacterVehicleBuilder {
        this._entity.numberPlate = numberPlate;
        return this;
    }

    public setId(id: number): CharacterVehicleBuilder {
        this._entity.id = id;
        return this;
    }

    public setCharacterId(id: number): CharacterVehicleBuilder {
        this._entity.fk_Character_id = id;
        return this;
    }

    public setVehicleId(id: number): CharacterVehicleBuilder {
        this._entity.fk_Vehicle_id = id;
        return this;
    }

    public setCharacter(character: Character | CharacterBuilder): CharacterVehicleBuilder {
        if (character instanceof CharacterBuilder) character = <Character>character.build();
        this._entity.Character = character;
        return this;
    }

    public setVehicle(vehicle: Vehicle | VehicleBuilder): CharacterVehicleBuilder {
        if (vehicle instanceof VehicleBuilder) vehicle = <Vehicle>vehicle.build();
        this._entity.Vehicle = vehicle;
        return this;
    }

    public addVehicleInventory(vehicleInventory: VehicleInventory | VehicleInventoryBuilder): CharacterVehicleBuilder {
        if (!this._entity.VechileInventory) this._entity.VechileInventory = new Array<VehicleInventory>();
        if (vehicleInventory instanceof VehicleInventoryBuilder)
            vehicleInventory = <VehicleInventory>vehicleInventory.build();
        this._entity.VechileInventory.push(vehicleInventory);
        return this;
    }

    public setVehicleProperties(
        vehicleProperties: VehicleProperties | VehiclePropertiesBuilder
    ): CharacterVehicleBuilder {
        if (vehicleProperties instanceof VehiclePropertiesBuilder)
            vehicleProperties = <VehicleProperties>vehicleProperties.build();
        this._entity.VehicleProperties = vehicleProperties;
        return this;
    }
}
