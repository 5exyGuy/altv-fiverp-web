import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Business } from './Business';
import { Inventory } from './Inventory';

@Index('fk_Business_id', ['fkBusinessId'], {})
@Index('fk_Inventory_id', ['fkInventoryId'], {})
@Entity('BusinessInventory', { schema: 'test' })
export class BusinessInventory extends BaseEntity {
    @Column('int', { primary: true, name: 'id' })
    id: number;

    @Column('int', { name: 'fk_Business_id' })
    fkBusinessId: number;

    @Column('int', { name: 'fk_Inventory_id' })
    fkInventoryId: number;

    @ManyToOne(() => Business, (business) => business.businessInventories, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    })
    @JoinColumn([{ name: 'fk_Business_id', referencedColumnName: 'id' }])
    fkBusiness: Business;

    @ManyToOne(() => Inventory, (inventory) => inventory.businessInventories, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    })
    @JoinColumn([{ name: 'fk_Inventory_id', referencedColumnName: 'id' }])
    fkInventory: Inventory;
}
