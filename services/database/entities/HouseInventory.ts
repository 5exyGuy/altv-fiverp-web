import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Inventory } from './Inventory';
import { CharacterHouse } from './CharacterHouse';

@Index('fk_HouseInventories_Houses', ['characterHouseId'], {})
@Index('fk_HouseInventories_Inventories', ['inventoryId'], {})
@Entity('houseinventory', { schema: 'fiverp' })
export class HouseInventory {
    @Column('int', { primary: true, name: 'id' })
    id: number;

    @Column('int', { name: 'characterHouseId' })
    characterHouseId: number;

    @Column('int', { name: 'inventoryId' })
    inventoryId: number;

    @ManyToOne(() => Inventory, (inventory) => inventory.houseInventories, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
    })
    @JoinColumn([{ name: 'inventoryId', referencedColumnName: 'id' }])
    inventory: Inventory;

    @ManyToOne(() => CharacterHouse, (characterhouse) => characterhouse.houseInventories, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
    })
    @JoinColumn([{ name: 'characterHouseId', referencedColumnName: 'id' }])
    characterHouse: CharacterHouse;
}
