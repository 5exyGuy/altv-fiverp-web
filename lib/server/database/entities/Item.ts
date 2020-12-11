import Entity from '../Entity';
import InventoryItem from './InventoryItem';

export default class Item extends Entity {
    public name: string;
    public hash: string;
    public weight: number;
    public id: number;
    public InventoryItem: InventoryItem[];
}
