import Entity from '../Entity';
import Business from './Business';
import Inventory from './Inventory';

export default class BusinessInventory extends Entity<BusinessInventory> {
    public id: number;
    public fkInventoryId: number;
    public fkBusinessId: number;
    public fkInventory: Inventory;
    public fkBusiness: Business;
}
