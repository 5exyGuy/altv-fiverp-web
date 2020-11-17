import { Column, Entity, OneToMany } from "typeorm";
import { ApartmentInventory } from "./ApartmentInventory";
import { BusinessInventory } from "./BusinessInventory";
import { CharacterInventory } from "./CharacterInventory";
import { HouseInventory } from "./HouseInventory";
import { InventoryItem } from "./InventoryItem";
import { VehicleInventory } from "./VehicleInventory";

@Entity("inventory", { schema: "fiverp" })
export class Inventory {
    @Column("int", { primary: true, name: "id" })
    id: number;

    @OneToMany(
        () => ApartmentInventory,
        (apartmentinventory) => apartmentinventory.inventory
    )
    apartmentinventories: ApartmentInventory[];

    @OneToMany(
        () => BusinessInventory,
        (businessinventory) => businessinventory.inventory
    )
    businessinventories: BusinessInventory[];

    @OneToMany(
        () => CharacterInventory,
        (characterinventory) => characterinventory.inventory
    )
    characterinventories: CharacterInventory[];

    @OneToMany(
        () => HouseInventory,
        (houseinventory) => houseinventory.inventory
    )
    houseinventories: HouseInventory[];

    @OneToMany(() => InventoryItem, (inventoryitem) => inventoryitem.inventory)
    inventoryitems: InventoryItem[];

    @OneToMany(
        () => VehicleInventory,
        (vehicleinventory) => vehicleinventory.inventory
    )
    vehicleinventories: VehicleInventory[];
}
