import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Apartment } from './Apartment';
import { Inventory } from './Inventory';

@Index('fk_Apartment_id', ['fkApartmentId'], {})
@Index('fk_Inventory_id', ['fkInventoryId'], {})
@Entity('ApartmentInventory', { schema: 'test' })
export class ApartmentInventory extends BaseEntity {
    @Column('int', { primary: true, name: 'id' })
    id: number;

    @Column('int', { name: 'fk_Apartment_id' })
    fkApartmentId: number;

    @Column('int', { name: 'fk_Inventory_id' })
    fkInventoryId: number;

    @ManyToOne(() => Apartment, (apartment) => apartment.apartmentInventories, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    })
    @JoinColumn([{ name: 'fk_Apartment_id', referencedColumnName: 'id' }])
    fkApartment: Apartment;

    @ManyToOne(() => Inventory, (inventory) => inventory.apartmentInventories, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    })
    @JoinColumn([{ name: 'fk_Inventory_id', referencedColumnName: 'id' }])
    fkInventory: Inventory;
}
