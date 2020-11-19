import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Inventory } from './Inventory';
import { Item } from './Item';

@Index('fk_InventoryItems_Items', ['itemId'], {})
@Index('fk_InventoryItems_Inventories', ['inventoryId'], {})
@Entity('inventoryitem', { schema: 'fiverp' })
export class InventoryItem {
    @Column('int', { primary: true, name: 'id' })
    id: number;

    @Column('int', { name: 'inventoryId' })
    inventoryId: number;

    @Column('int', { name: 'itemId' })
    itemId: number;

    @Column('smallint', { name: 'amount' })
    amount: number;

    @Column('smallint', { name: 'slot' })
    slot: number;

    @ManyToOne(() => Inventory, (inventory) => inventory.inventoryItems, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
    })
    @JoinColumn([{ name: 'inventoryId', referencedColumnName: 'id' }])
    inventory: Inventory;

    @ManyToOne(() => Item, (item) => item.inventoryItems, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
    })
    @JoinColumn([{ name: 'itemId', referencedColumnName: 'id' }])
    item: Item;
}
