import InventoryItem from './InventoryItem';

export default class Item {
    public name: string;
    public hash: Buffer;
    public weight: number;
    public id: number;
    public InventoryItem: InventoryItem[];
}
