import Inventory from './Inventory';
import House from './House';
import Entity from '../Entity';

export default class HouseInventory extends Entity {
    public id: number;
    public fk_Inventory_id: number;
    public fk_House_id: number;
    public House: House;
    public Inventory: Inventory;
}
