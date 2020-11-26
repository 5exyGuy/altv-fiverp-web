import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Inventory } from './Inventory';
import { Character } from './Character';

@Index('fk_Character_id', ['fkCharacterId'], {})
@Index('fk_Inventory_id', ['fkInventoryId'], {})
@Entity('CharacterInventory', { schema: 'test' })
export class CharacterInventory extends BaseEntity {
    @Column('int', { primary: true, name: 'id' })
    id: number;

    @Column('int', { name: 'fk_Inventory_id' })
    fkInventoryId: number;

    @Column('int', { name: 'fk_Character_id' })
    fkCharacterId: number;

    @ManyToOne(() => Inventory, (inventory) => inventory.characterInventories, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    })
    @JoinColumn([{ name: 'fk_Inventory_id', referencedColumnName: 'id' }])
    fkInventory: Inventory;

    @ManyToOne(() => Character, (character) => character.characterInventories, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    })
    @JoinColumn([{ name: 'fk_Character_id', referencedColumnName: 'id' }])
    fkCharacter: Character;
}
