import Item from './Item';
import Inventory from './Inventory';

export default class InventoryItem {
    public slot: number;
    public amount: number;
    public id: number;
    public fk_Item_id: number;
    public fk_Inventory_id: number;
    public Inventory: Inventory;
    public Item: Item;
}
