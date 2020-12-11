import Skill from './Skill';
import Character from './Character';
import Entity from '../Entity';

export default class CharacterSkill extends Entity {
    public level: number;
    public xp: number;
    public id: number;
    public fk_Skill_id: number;
    public fk_Character_id: number;
    public Character: Character;
    public Skill: Skill;
}
