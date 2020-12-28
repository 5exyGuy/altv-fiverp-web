import Entity from '../Entity';
import Apartment from './Apartment';
import Inventory from './Inventory';

export default class ApartmentInventory extends Entity<ApartmentInventory> {
    public id: number;
    public fkInventoryId: number;
    public fkApartmentId: number;
    public fkInventory: Inventory;
    public fkApartment: Apartment;
}
