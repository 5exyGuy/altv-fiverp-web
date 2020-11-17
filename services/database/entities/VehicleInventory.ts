import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Inventory } from "./Inventory";
import { CharacterVehicle } from "./CharacterVehicle";

@Index("fk_VehicleInventories_Inventories", ["inventoryId"], {})
@Index("fk_VehicleInventory_CharacterVehicle", ["vehicleId"], {})
@Entity("vehicleinventory", { schema: "fiverp" })
export class VehicleInventory {
    @Column("int", { primary: true, name: "id" })
    id: number;

    @Column("int", { name: "vehicleId" })
    vehicleId: number;

    @Column("int", { name: "inventoryId" })
    inventoryId: number;

    @ManyToOne(() => Inventory, (inventory) => inventory.vehicleinventories, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    })
    @JoinColumn([{ name: "inventoryId", referencedColumnName: "id" }])
    inventory: Inventory;

    @ManyToOne(
        () => CharacterVehicle,
        (charactervehicle) => charactervehicle.vehicleinventories,
        {
            onDelete: "RESTRICT",
            onUpdate: "RESTRICT",
        }
    )
    @JoinColumn([{ name: "vehicleId", referencedColumnName: "id" }])
    vehicle: CharacterVehicle;
}
