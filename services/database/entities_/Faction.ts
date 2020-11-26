import { BaseEntity, Column, Entity, Index, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Character } from './Character';
import { FactionMember } from './FactionMember';

@Index('fk_Character_id', ['fkCharacterId'], { unique: true })
@Entity('Faction', { schema: 'test' })
export class Faction extends BaseEntity {
    @Column('varchar', { name: 'name', length: 255 })
    name: string;

    @Column('datetime', { name: 'registrationDate' })
    registrationDate: Date;

    @Column('int', { primary: true, name: 'id' })
    id: number;

    @Column('int', { name: 'fk_Character_id', unique: true })
    fkCharacterId: number;

    @OneToOne(() => Character, (character) => character.faction, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    })
    @JoinColumn([{ name: 'fk_Character_id', referencedColumnName: 'id' }])
    fkCharacter: Character;

    @OneToMany(() => FactionMember, (factionMember) => factionMember.fkFaction)
    factionMembers: FactionMember[];
}
