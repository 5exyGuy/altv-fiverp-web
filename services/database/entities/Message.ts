import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Character } from './Character';

@Index('fk_CharacterReceiver_id', ['fkCharacterReceiverId'], { unique: true })
@Index('fk_CharacterSender_id', ['fkCharacterSenderId'], {})
@Entity('Message', { schema: 'test' })
export class Message extends BaseEntity {
    @Column('longtext', { name: 'content' })
    content: string;

    @Column('datetime', { name: 'date' })
    date: Date;

    @Column('int', { primary: true, name: 'id' })
    id: number;

    @Column('int', { name: 'fk_CharacterSender_id' })
    fkCharacterSenderId: number;

    @Column('int', { name: 'fk_CharacterReceiver_id', unique: true })
    fkCharacterReceiverId: number;

    @ManyToOne(() => Character, (character) => character.messages, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    })
    @JoinColumn([{ name: 'fk_CharacterSender_id', referencedColumnName: 'id' }])
    fkCharacterSender: Character;

    @OneToOne(() => Character, (character) => character.messages, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    })
    @JoinColumn([{ name: 'fk_CharacterReceiver_id', referencedColumnName: 'id' }])
    fkCharacterReceiver: Character;
}
