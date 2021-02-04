import { Entity, IEntity } from '../Entity';
import ItemModel from '../models/Item';
import { Builder, IBuilder } from '../../utilities/Builder';

interface IItem extends IEntity {
    name: string;
    hash: string;
    weight: number;
}

export default class Item extends Entity<typeof ItemModel, ItemModel, IItem> {
    public constructor(builder: IBuilder<IItem>) {
        super(builder);
        this.entityModelConstructor = ItemModel;
    }

    public static Builder(): IBuilder<IItem> {
        return Builder<IItem>();
    }
}
