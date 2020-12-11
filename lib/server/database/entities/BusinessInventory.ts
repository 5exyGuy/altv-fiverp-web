import Entity from '../Entity';
import Business from './Business';
import Inventory from './Inventory';

export default class BusinessInventory extends Entity {
    public id: number;
    public fk_Inventory_id: number;
    public fk_Business_id: number;
    public Business: Business;
    public Inventory: Inventory;
}
