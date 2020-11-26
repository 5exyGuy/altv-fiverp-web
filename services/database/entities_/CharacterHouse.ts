import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { House } from './House';
import { Character } from './Character';

@Index('fk_Character_id', ['fkCharacterId'], {})
@Index('fk_House_id', ['fkHouseId'], {})
@Entity('CharacterHouse', { schema: 'test' })
export class CharacterHouse extends BaseEntity {
    @Column('int', { primary: true, name: 'id' })
    id: number;

    @Column('int', { name: 'fk_House_id' })
    fkHouseId: number;

    @Column('int', { name: 'fk_Character_id' })
    fkCharacterId: number;

    @ManyToOne(() => House, (house) => house.characterHouses, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    })
    @JoinColumn([{ name: 'fk_House_id', referencedColumnName: 'id' }])
    fkHouse: House;

    @ManyToOne(() => Character, (character) => character.characterHouses, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    })
    @JoinColumn([{ name: 'fk_Character_id', referencedColumnName: 'id' }])
    fkCharacter: Character;
}
