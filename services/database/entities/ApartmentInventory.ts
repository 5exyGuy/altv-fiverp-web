import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Inventory } from "./Inventory";
import { CharacterApartment } from "./CharacterApartment";

@Index("fk_ApartmentInventories_Apartments", ["characterApartmentId"], {})
@Index("fk_ApartmentInventories_Inventories", ["inventoryId"], {})
@Entity("apartmentinventory", { schema: "fiverp" })
export class ApartmentInventory {
    @Column("int", { primary: true, name: "id" })
    id: number;

    @Column("int", { name: "characterApartmentId" })
    characterApartmentId: number;

    @Column("int", { name: "inventoryId" })
    inventoryId: number;

    @ManyToOne(() => Inventory, (inventory) => inventory.apartmentinventories, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    })
    @JoinColumn([{ name: "inventoryId", referencedColumnName: "id" }])
    inventory: Inventory;

    @ManyToOne(
        () => CharacterApartment,
        (characterapartment) => characterapartment.apartmentinventories,
        {
            onDelete: "RESTRICT",
            onUpdate: "RESTRICT",
        }
    )
    @JoinColumn([{ name: "characterApartmentId", referencedColumnName: "id" }])
    characterApartment: CharacterApartment;
}
