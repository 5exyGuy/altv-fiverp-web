import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Skill } from './Skill';
import { Character } from './Character';

@Index('fk_Character_id', ['fkCharacterId'], {})
@Index('fk_Skill_id', ['fkSkillId'], {})
@Entity('CharacterSkill', { schema: 'test' })
export class CharacterSkill extends BaseEntity {
    @Column('smallint', { name: 'level' })
    level: number;

    @Column('bigint', { name: 'xp' })
    xp: string;

    @Column('int', { primary: true, name: 'id' })
    id: number;

    @Column('int', { name: 'fk_Skill_id' })
    fkSkillId: number;

    @Column('int', { name: 'fk_Character_id' })
    fkCharacterId: number;

    @ManyToOne(() => Skill, (skill) => skill.characterSkills, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    })
    @JoinColumn([{ name: 'fk_Skill_id', referencedColumnName: 'id' }])
    fkSkill: Skill;

    @ManyToOne(() => Character, (character) => character.characterSkills, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    })
    @JoinColumn([{ name: 'fk_Character_id', referencedColumnName: 'id' }])
    fkCharacter: Character;
}
