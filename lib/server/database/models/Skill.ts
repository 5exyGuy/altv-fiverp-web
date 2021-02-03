import { Model } from 'objection';

export default class SkillModel extends Model {
    public id!: number;
    public name!: string;
    public hash!: string;
    public maxLevel!: number;

    public static get tableName(): string {
        return 'skills';
    }

    public static get idColumn(): string {
        return 'id';
    }
}
