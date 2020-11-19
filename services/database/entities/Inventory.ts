import { Column, Entity, OneToMany } from 'typeorm';
import { ApartmentInventory } from './ApartmentInventory';
import { BusinessInventory } from './BusinessInventory';
import { CharacterInventory } from './CharacterInventory';
import { HouseInventory } from './HouseInventory';
import { InventoryItem } from './InventoryItem';
import { VehicleInventory } from './VehicleInventory';

@Entity('inventory', { schema: 'fiverp' })
export class Inventory {
    @Column('int', { primary: true, name: 'id' })
    id: number;

    @OneToMany(() => ApartmentInventory, (apartmentinventory) => apartmentinventory.inventory)
    apartmentInventories: ApartmentInventory[];

    @OneToMany(() => BusinessInventory, (businessinventory) => businessinventory.inventory)
    businessInventories: BusinessInventory[];

    @OneToMany(() => CharacterInventory, (characterinventory) => characterinventory.inventory)
    characterInventories: CharacterInventory[];

    @OneToMany(() => HouseInventory, (houseinventory) => houseinventory.inventory)
    houseInventories: HouseInventory[];

    @OneToMany(() => InventoryItem, (inventoryitem) => inventoryitem.inventory)
    inventoryItems: InventoryItem[];

    @OneToMany(() => VehicleInventory, (vehicleinventory) => vehicleinventory.inventory)
    vehicleInventories: VehicleInventory[];
}
