import Entity from '../Entity';
import Item from './Item';

export default class Inventory extends Entity<Inventory> {
    private _id: number;
    private _items: Array<Item>;
}
