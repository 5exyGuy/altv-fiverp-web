import Skill from './Skill';
import Character from './Character';

export default class CharacterSkill {
    public level: number;
    public xp: number;
    public id: number;
    public fk_Skill_id: number;
    public fk_Character_id: number;
    public Character: Character;
    public Skill: Skill;
}
