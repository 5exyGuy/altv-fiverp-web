import Entity from '../Entity';

export default class Skill extends Entity<Skill> {
    private _name: string;
    private _hash: string;
    private _maxLevel: number;
    private _id: number;
}
