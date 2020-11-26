import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Business } from './Business';
import { Character } from './Character';

@Index('fk_Business_id', ['fkBusinessId'], {})
@Index('fk_Character_id', ['fkCharacterId'], {})
@Entity('CharacterBusiness', { schema: 'test' })
export class CharacterBusiness extends BaseEntity {
    @Column('int', { primary: true, name: 'id' })
    id: number;

    @Column('int', { name: 'fk_Business_id' })
    fkBusinessId: number;

    @Column('int', { name: 'fk_Character_id' })
    fkCharacterId: number;

    @ManyToOne(() => Business, (business) => business.characterBusinesses, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    })
    @JoinColumn([{ name: 'fk_Business_id', referencedColumnName: 'id' }])
    fkBusiness: Business;

    @ManyToOne(() => Character, (character) => character.characterBusinesses, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    })
    @JoinColumn([{ name: 'fk_Character_id', referencedColumnName: 'id' }])
    fkCharacter: Character;
}
