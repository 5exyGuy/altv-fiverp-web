import CharacterSkill from './CharacterSkill';

export default class Skill {
    public name: string;
    public hash: Buffer;
    public maxLevel: number;
    public id: number;
    public CharacterSkill: CharacterSkill[];
}
