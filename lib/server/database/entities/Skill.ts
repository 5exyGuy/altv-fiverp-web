import Entity from '../Entity';
import CharacterSkill from './CharacterSkill';

export default class Skill extends Entity<Skill> {
    public name: string;
    public hash: string;
    public maxLevel: number;
    public id: number;
    public characterSkills: CharacterSkill[];
}
