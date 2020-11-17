import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Inventory } from "./Inventory";
import { CharacterBusiness } from "./CharacterBusiness";

@Index("fk_BusinessInventories_Businesses", ["characterBusinessId"], {})
@Index("fk_BusinessInventories_Inventories", ["inventoryId"], {})
@Entity("businessinventory", { schema: "fiverp" })
export class BusinessInventory {
    @Column("int", { primary: true, name: "id" })
    id: number;

    @Column("int", { name: "characterBusinessId" })
    characterBusinessId: number;

    @Column("int", { name: "inventoryId" })
    inventoryId: number;

    @ManyToOne(() => Inventory, (inventory) => inventory.businessinventories, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    })
    @JoinColumn([{ name: "inventoryId", referencedColumnName: "id" }])
    inventory: Inventory;

    @ManyToOne(
        () => CharacterBusiness,
        (characterbusiness) => characterbusiness.businessinventories,
        {
            onDelete: "RESTRICT",
            onUpdate: "RESTRICT",
        }
    )
    @JoinColumn([{ name: "characterBusinessId", referencedColumnName: "id" }])
    characterBusiness: CharacterBusiness;
}
