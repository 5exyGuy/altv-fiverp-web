import Entity from '../Entity';
import CharacterSkill from './CharacterSkill';

export default class Skill extends Entity {
    public name: string;
    public hash: string;
    public maxLevel: number;
    public id: number;
    public CharacterSkill: CharacterSkill[];
}
