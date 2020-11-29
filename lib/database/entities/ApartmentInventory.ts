import Apartment from './Apartment';
import Inventory from './Inventory';

export default class ApartmentInventory {
    public id: number;
    public fk_Inventory_id: number;
    public fk_Apartment_id: number;
    public Apartment: Apartment;
    public Inventory: Inventory;
}
