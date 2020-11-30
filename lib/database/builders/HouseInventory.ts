import Inventory from './Inventory';
import House from './House';

export default class HouseInventory {
    public id: number;
    public fk_Inventory_id: number;
    public fk_House_id: number;
    public House: House;
    public Inventory: Inventory;
}
