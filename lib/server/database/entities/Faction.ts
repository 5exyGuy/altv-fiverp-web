import { Entity, IEntity } from '../Entity';
import FactionModel from '../models/Faction';
import { Builder, IBuilder } from '../../utilities/Builder';

interface IFaction extends IEntity {
    name: string;
    createdAt: Date;
}

export default class Faction extends Entity<typeof FactionModel, FactionModel, IFaction> {
    public constructor(builder: IBuilder<IFaction>) {
        super(builder);
        this.entityModelConstructor = FactionModel;
    }

    public static Builder(): IBuilder<IFaction> {
        return Builder<IFaction>();
    }
}
