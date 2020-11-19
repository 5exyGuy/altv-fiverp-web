import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Character } from './Character';
import { Faction } from './Faction';

@Index('fk_FactionMember_Characters', ['characterId'], {})
@Index('fk_FactionMember_Factions', ['factionId'], {})
@Entity('factionmember', { schema: 'fiverp' })
export class FactionMember {
    @Column('int', { primary: true, name: 'id' })
    id: number;

    @Column('int', { name: 'characterId' })
    characterId: number;

    @Column('int', { name: 'factionId' })
    factionId: number;

    @ManyToOne(() => Character, (character) => character.factionMembers, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
    })
    @JoinColumn([{ name: 'characterId', referencedColumnName: 'id' }])
    character: Character;

    @ManyToOne(() => Faction, (faction) => faction.factionMembers, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
    })
    @JoinColumn([{ name: 'factionId', referencedColumnName: 'id' }])
    faction: Faction;
}
