import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Character } from './Character';
import { FactionMember } from './FactionMember';

@Index('fk_Faction_Character', ['managerId'], {})
@Entity('faction', { schema: 'fiverp' })
export class Faction {
    @Column('int', { primary: true, name: 'id' })
    id: number;

    @Column('int', { name: 'managerId' })
    managerId: number;

    @Column('varchar', { name: 'name', length: 255 })
    name: string;

    @Column('datetime', { name: 'date' })
    date: Date;

    @ManyToOne(() => Character, (character) => character.factions, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
    })
    @JoinColumn([{ name: 'managerId', referencedColumnName: 'id' }])
    manager: Character;

    @OneToMany(() => FactionMember, (factionmember) => factionmember.faction)
    factionMembers: FactionMember[];
}
