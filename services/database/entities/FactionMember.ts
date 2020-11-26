import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Character } from './Character';
import { Faction } from './Faction';

@Index('fk_Character_id', ['fkCharacterId'], {})
@Index('fk_Faction_id', ['fkFactionId'], {})
@Entity('FactionMember', { schema: 'test' })
export class FactionMember extends BaseEntity {
    @Column('datetime', { name: 'joinDate' })
    joinDate: Date;

    @Column('int', { primary: true, name: 'id' })
    id: number;

    @Column('int', { name: 'fk_Character_id' })
    fkCharacterId: number;

    @Column('int', { name: 'fk_Faction_id' })
    fkFactionId: number;

    @ManyToOne(() => Character, (character) => character.factionMembers, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    })
    @JoinColumn([{ name: 'fk_Character_id', referencedColumnName: 'id' }])
    fkCharacter: Character;

    @ManyToOne(() => Faction, (faction) => faction.factionMembers, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    })
    @JoinColumn([{ name: 'fk_Faction_id', referencedColumnName: 'id' }])
    fkFaction: Faction;
}
