import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Character } from './Character';

@Index('fk_CharacterContact_id', ['fkCharacterContactId'], { unique: true })
@Index('fk_CharacterHolder_id', ['fkCharacterHolderId'], {})
@Entity('Contact', { schema: 'test' })
export class Contact extends BaseEntity {
    @Column('int', { primary: true, name: 'id' })
    id: number;

    @Column('int', { name: 'fk_CharacterHolder_id' })
    fkCharacterHolderId: number;

    @Column('int', { name: 'fk_CharacterContact_id', unique: true })
    fkCharacterContactId: number;

    @ManyToOne(() => Character, (character) => character.contacts, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    })
    @JoinColumn([{ name: 'fk_CharacterHolder_id', referencedColumnName: 'id' }])
    fkCharacterHolder: Character;

    @OneToOne(() => Character, (character) => character.contact, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    })
    @JoinColumn([{ name: 'fk_CharacterContact_id', referencedColumnName: 'id' }])
    fkCharacterContact: Character;
}
