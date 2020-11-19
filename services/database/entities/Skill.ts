import { Column, Entity, OneToMany } from 'typeorm';
import { CharacterSkill } from './CharacterSkill';

@Entity('skill', { schema: 'fiverp' })
export class Skill {
    @Column('int', { primary: true, name: 'id' })
    id: number;

    @Column('varchar', { name: 'name', length: 255 })
    name: string;

    @Column('longblob', { name: 'hash' })
    hash: Buffer;

    @Column('smallint', { name: 'maxLevel' })
    maxLevel: number;

    @OneToMany(() => CharacterSkill, (characterskill) => characterskill.skill)
    characterSkills: CharacterSkill[];
}
