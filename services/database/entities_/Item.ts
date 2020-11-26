import { BaseEntity, Column, Entity, OneToMany } from 'typeorm';
import { InventoryItem } from './InventoryItem';

@Entity('Item', { schema: 'test' })
export class Item extends BaseEntity {
    @Column('varchar', { name: 'name', length: 255 })
    name: string;

    @Column('binary', { name: 'hash', length: 1 })
    hash: Buffer;

    @Column('double', { name: 'weight', precision: 22 })
    weight: number;

    @Column('int', { primary: true, name: 'id' })
    id: number;

    @OneToMany(() => InventoryItem, (inventoryItem) => inventoryItem.fkItem)
    inventoryItems: InventoryItem[];
}
