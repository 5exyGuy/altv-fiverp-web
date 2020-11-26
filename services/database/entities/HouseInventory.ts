import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Inventory } from './Inventory';
import { House } from './House';

@Index('fk_House_id', ['fkHouseId'], {})
@Index('fk_Inventory_id', ['fkInventoryId'], {})
@Entity('HouseInventory', { schema: 'test' })
export class HouseInventory extends BaseEntity {
    @Column('int', { primary: true, name: 'id' })
    id: number;

    @Column('int', { name: 'fk_Inventory_id' })
    fkInventoryId: number;

    @Column('int', { name: 'fk_House_id' })
    fkHouseId: number;

    @ManyToOne(() => Inventory, (inventory) => inventory.houseInventories, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    })
    @JoinColumn([{ name: 'fk_Inventory_id', referencedColumnName: 'id' }])
    fkInventory: Inventory;

    @ManyToOne(() => House, (house) => house.houseInventories, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    })
    @JoinColumn([{ name: 'fk_House_id', referencedColumnName: 'id' }])
    fkHouse: House;
}
