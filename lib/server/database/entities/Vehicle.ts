import Entity from '../Entity';

export default class Vehicle extends Entity<Vehicle> {
    private _name: string;
    private _hash: string;
    private _price: number;
    private _manufacturer: string;
    private _seats: number;
    private _class: string;
    private _type: string;
    private _maxBraking: number;
    private _maxBrakingMods: number;
    private _maxSpeed: number;
    private _maxTraction: number;
    private _acceleration: number;
    private _agility: number;
    private _maxKnots: number;
    private _moveResistance: number;
    private _id: number;
}
