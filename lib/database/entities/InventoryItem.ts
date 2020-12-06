import Item from './Item';
import Inventory from './Inventory';
import Entity from '../Entity';

export default class InventoryItem extends Entity {
    public slot: number;
    public amount: number;
    public id: number;
    public fk_Item_id: number;
    public fk_Inventory_id: number;
    public Inventory: Inventory;
    public Item: Item;
}
