import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Item } from './Item';
import { Inventory } from './Inventory';

@Index('fk_Inventory_id', ['fkInventoryId'], {})
@Index('fk_Item_id', ['fkItemId'], {})
@Entity('InventoryItem', { schema: 'test' })
export class InventoryItem extends BaseEntity {
    @Column('smallint', { name: 'slot' })
    slot: number;

    @Column('smallint', { name: 'amount' })
    amount: number;

    @Column('int', { primary: true, name: 'id' })
    id: number;

    @Column('int', { name: 'fk_Item_id' })
    fkItemId: number;

    @Column('int', { name: 'fk_Inventory_id' })
    fkInventoryId: number;

    @ManyToOne(() => Item, (item) => item.inventoryItems, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    })
    @JoinColumn([{ name: 'fk_Item_id', referencedColumnName: 'id' }])
    fkItem: Item;

    @ManyToOne(() => Inventory, (inventory) => inventory.inventoryItems, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    })
    @JoinColumn([{ name: 'fk_Inventory_id', referencedColumnName: 'id' }])
    fkInventory: Inventory;
}
