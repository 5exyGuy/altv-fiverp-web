import { BaseEntity, Column, Entity, OneToMany } from 'typeorm';
import { CharacterSkill } from './CharacterSkill';

@Entity('Skill', { schema: 'test' })
export class Skill extends BaseEntity {
    @Column('varchar', { name: 'name', length: 255 })
    name: string;

    @Column('binary', { name: 'hash', length: 1 })
    hash: Buffer;

    @Column('smallint', { name: 'maxLevel' })
    maxLevel: number;

    @Column('int', { primary: true, name: 'id' })
    id: number;

    @OneToMany(() => CharacterSkill, (characterSkill) => characterSkill.fkSkill)
    characterSkills: CharacterSkill[];
}
