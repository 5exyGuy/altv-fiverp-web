import { Entity, IEntity } from '../Entity';
import VehicleModel from '../models/Vehicle';
import { Builder, IBuilder } from '../../utilities/Builder';

interface IVehicle extends IEntity {
    name: string;
    hash: string;
    price: number;
    manufacturer: string;
    seats: number;
    class: string;
    type: string;
    maxBraking: number;
    maxBrakingMods: number;
    maxSpeed: number;
    maxTraction: number;
    acceleration: number;
    agility: number;
    maxKnots: number;
    moveResistance: number;
}

export default class Vehicle extends Entity<typeof VehicleModel, VehicleModel, IVehicle> {
    public constructor(builder: IBuilder<IVehicle>) {
        super(builder);
        this.entityModelConstructor = VehicleModel;
    }

    public static Builder(): IBuilder<IVehicle> {
        return Builder<IVehicle>();
    }
}
