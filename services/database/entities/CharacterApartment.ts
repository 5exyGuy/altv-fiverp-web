import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Apartment } from './Apartment';
import { Character } from './Character';

@Index('fk_Apartment_id', ['fkApartmentId'], {})
@Index('fk_Character_id', ['fkCharacterId'], {})
@Entity('CharacterApartment', { schema: 'test' })
export class CharacterApartment extends BaseEntity {
    @Column('int', { primary: true, name: 'id' })
    id: number;

    @Column('int', { name: 'fk_Apartment_id' })
    fkApartmentId: number;

    @Column('int', { name: 'fk_Character_id' })
    fkCharacterId: number;

    @ManyToOne(() => Apartment, (apartment) => apartment.characterApartments, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    })
    @JoinColumn([{ name: 'fk_Apartment_id', referencedColumnName: 'id' }])
    fkApartment: Apartment;

    @ManyToOne(() => Character, (character) => character.characterApartments, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    })
    @JoinColumn([{ name: 'fk_Character_id', referencedColumnName: 'id' }])
    fkCharacter: Character;
}
