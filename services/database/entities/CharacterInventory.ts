import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Character } from './Character';
import { Inventory } from './Inventory';

@Index('fk_CharacterInventories_Characters', ['characterId'], {})
@Index('fk_CharacterInventories_Inventories', ['inventoryId'], {})
@Entity('characterinventory', { schema: 'fiverp' })
export class CharacterInventory {
    @Column('int', { primary: true, name: 'id' })
    id: number;

    @Column('int', { name: 'characterId' })
    characterId: number;

    @Column('int', { name: 'inventoryId' })
    inventoryId: number;

    @ManyToOne(() => Character, (character) => character.characterInventories, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
    })
    @JoinColumn([{ name: 'characterId', referencedColumnName: 'id' }])
    character: Character;

    @ManyToOne(() => Inventory, (inventory) => inventory.characterInventories, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
    })
    @JoinColumn([{ name: 'inventoryId', referencedColumnName: 'id' }])
    inventory: Inventory;
}
