import { Model } from 'objection';

export default class Item extends Model {
    public id!: number;
    public name!: string;
    public hash!: string;
    public weight!: number;

    public static get tableName(): string {
        return 'items';
    }

    public static get idColumn(): string {
        return 'id';
    }
}
