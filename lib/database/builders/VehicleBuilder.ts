import CharacterVehicle from '../entities/CharacterVehicle';
import Vehicle from '../entities/Vehicle';
import EntityBuilder from '../EntityBuilder';
import CharacterVehicleBuilder from './CharacterVehicleBuilder';

export default class VehicleBuilder extends EntityBuilder {
    protected _entity: Vehicle = new Vehicle();

    public setName(name: string): VehicleBuilder {
        this._entity.name = name;
        return this;
    }

    public setHash(hash: string): VehicleBuilder {
        this._entity.hash = hash;
        return this;
    }

    public setPrice(price: number): VehicleBuilder {
        this._entity.price = price;
        return this;
    }

    public setManufacturer(manufacturer: string): VehicleBuilder {
        this._entity.manufacturer = manufacturer;
        return this;
    }

    public setSeats(seats: number): VehicleBuilder {
        this._entity.seats = seats;
        return this;
    }

    public setClass(vehClass: string): VehicleBuilder {
        this._entity.class = vehClass;
        return this;
    }

    public setType(type: string): VehicleBuilder {
        this._entity.type = type;
        return this;
    }

    public setMaxBraking(maxBraking: number): VehicleBuilder {
        this._entity.maxBraking = maxBraking;
        return this;
    }

    public setMaxBrakingMods(maxBrakingMods: number): VehicleBuilder {
        this._entity.maxBrakingMods = maxBrakingMods;
        return this;
    }

    public setMaxSpeed(maxSpeed: number): VehicleBuilder {
        this._entity.maxSpeed = maxSpeed;
        return this;
    }

    public setMaxTraction(maxTraction: number): VehicleBuilder {
        this._entity.maxTraction = maxTraction;
        return this;
    }

    public setAcceleration(acceleration: number): VehicleBuilder {
        this._entity.acceleration = acceleration;
        return this;
    }

    public setAgility(agility: number): VehicleBuilder {
        this._entity.agility = agility;
        return this;
    }

    public setMaxKnots(maxKnots: number): VehicleBuilder {
        this._entity.maxKnots = maxKnots;
        return this;
    }

    public setMoveResistance(moveResistance: number): VehicleBuilder {
        this._entity.moveResistance = moveResistance;
        return this;
    }

    public setId(id: number): VehicleBuilder {
        this._entity.id = id;
        return this;
    }

    public addCharacterVehicle(characterVehicle: CharacterVehicle | CharacterVehicleBuilder): VehicleBuilder {
        if (!this._entity.CharacterVehicle) this._entity.CharacterVehicle = new Array<CharacterVehicle>();
        if (characterVehicle instanceof CharacterVehicleBuilder)
            characterVehicle = <CharacterVehicle>characterVehicle.build();
        this._entity.CharacterVehicle.push(characterVehicle);
        return this;
    }
}
