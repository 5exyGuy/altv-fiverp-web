import Inventory from './Inventory';
import House from './House';
import Entity from '../Entity';

export default class HouseInventory extends Entity<HouseInventory> {
    public id: number;
    public fkHouseId: number;
    public fkInventoryId: number;
    public fkHouse: House;
    public fkInventory: Inventory;
}
