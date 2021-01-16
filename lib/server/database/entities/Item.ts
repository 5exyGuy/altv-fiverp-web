import Entity from '../Entity';

export default class Item extends Entity<Item> {
    private _name: string;
    private _hash: string;
    private _weight: number;
    private _id: number;
}
