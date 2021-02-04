import { Entity, IEntity } from '../Entity';
import InventoryModel from '../models/Inventory';
import { Builder, IBuilder } from '../../utilities/Builder';

type IInventory = IEntity;

export default class Inventory extends Entity<typeof InventoryModel, InventoryModel, IInventory> {
    public constructor(builder: IBuilder<IInventory>) {
        super(builder);
        this.entityModelConstructor = InventoryModel;
    }

    public static Builder(): IBuilder<IInventory> {
        return Builder<IInventory>();
    }
}
