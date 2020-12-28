import Skill from './Skill';
import Character from './Character';
import Entity from '../Entity';

export default class CharacterSkill extends Entity<CharacterSkill> {
    public level: number;
    public xp: number;
    public id: number;
    public fkSkillId: number;
    public fkCharacterId: number;
    public fkSkill: Skill;
    public fkCharacter: Character;
}
