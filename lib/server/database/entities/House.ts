import { Entity, IEntity } from '../Entity';
import HouseModel from '../models/House';
import { Builder, IBuilder } from '../../utilities/Builder';

interface IHouse extends IEntity {
    price: number;
    locked: boolean;
    location: string;
}

export default class House extends Entity<typeof HouseModel, HouseModel, IHouse> {
    public constructor(builder: IBuilder<IHouse>) {
        super(builder);
        this.entityModelConstructor = HouseModel;
    }

    public static Builder(): IBuilder<IHouse> {
        return Builder<IHouse>();
    }
}
