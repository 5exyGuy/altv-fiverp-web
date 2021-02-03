import { Model } from 'objection';

export default class Vehicle extends Model {
    public id!: number;
    public name!: string;
    public hash!: string;
    public price!: number;
    public manufacturer!: string;
    public seats!: number;
    public class!: string;
    public type!: string;
    public maxBraking!: number;
    public maxBrakingMods!: number;
    public maxSpeed!: number;
    public maxTraction!: number;
    public acceleration!: number;
    public agility!: number;
    public maxKnots!: number;
    public moveResistance!: number;

    public static get tableName(): string {
        return 'vehicles';
    }

    public static get idColumn(): string {
        return 'id';
    }
}
