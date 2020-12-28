import Item from './Item';
import Inventory from './Inventory';
import Entity from '../Entity';

export default class InventoryItem extends Entity<InventoryItem> {
    public slot: number;
    public amount: number;
    public id: number;
    public fkInventoryId: number;
    public fkItemId: number;
    public fkInventory: Inventory;
    public fkItem: Item;
}
