import Entity from '../Entity';
import InventoryItem from './InventoryItem';

export default class Item extends Entity<Item> {
    public name: string;
    public hash: string;
    public weight: number;
    public id: number;
    public inventoryItems: InventoryItem[];
}
