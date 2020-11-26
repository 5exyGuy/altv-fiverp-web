import { BaseEntity, Column, Entity, OneToMany } from 'typeorm';
import { ApartmentInventory } from './ApartmentInventory';
import { BusinessInventory } from './BusinessInventory';
import { CharacterInventory } from './CharacterInventory';
import { HouseInventory } from './HouseInventory';
import { InventoryItem } from './InventoryItem';
import { VechileInventory } from './VechileInventory';

@Entity('Inventory', { schema: 'test' })
export class Inventory extends BaseEntity {
    @Column('int', { primary: true, name: 'id' })
    id: number;

    @OneToMany(() => ApartmentInventory, (apartmentInventory) => apartmentInventory.fkInventory)
    apartmentInventories: ApartmentInventory[];

    @OneToMany(() => BusinessInventory, (businessInventory) => businessInventory.fkInventory)
    businessInventories: BusinessInventory[];

    @OneToMany(() => CharacterInventory, (characterInventory) => characterInventory.fkInventory)
    characterInventories: CharacterInventory[];

    @OneToMany(() => HouseInventory, (houseInventory) => houseInventory.fkInventory)
    houseInventories: HouseInventory[];

    @OneToMany(() => InventoryItem, (inventoryItem) => inventoryItem.fkInventory)
    inventoryItems: InventoryItem[];

    @OneToMany(() => VechileInventory, (vechileInventory) => vechileInventory.fkInventory)
    vechileInventories: VechileInventory[];
}
