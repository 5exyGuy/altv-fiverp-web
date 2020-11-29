import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import Inventory from "./Inventory";
import CharacterVehicle from "./CharacterVehicle";

@Index("fk_CharacterVehicle_id", ["fkCharacterVehicleId"], {})
@Index("fk_Inventory_id", ["fkInventoryId"], {})
@Entity("VechileInventory")
export default class VechileInventory {
  @Column("int", { primary: true, name: "id" })
  public id!: number;

  @Column("int", { name: "fk_Inventory_id" })
  public fkInventoryId!: number;

  @Column("int", { name: "fk_CharacterVehicle_id" })
  public fkCharacterVehicleId!: number;

  @ManyToOne(() => Inventory, (inventory) => inventory.vechileInventories, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
    lazy: true,
  })
  @JoinColumn([{ name: "fk_Inventory_id", referencedColumnName: "id" }])
  public fkInventory!: Promise<Inventory>;

  @ManyToOne(
    () => CharacterVehicle,
    (characterVehicle) => characterVehicle.vechileInventories,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION", lazy: true }
  )
  @JoinColumn([{ name: "fk_CharacterVehicle_id", referencedColumnName: "id" }])
  public fkCharacterVehicle!: Promise<CharacterVehicle>;
}
