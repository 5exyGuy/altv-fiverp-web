import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import Inventory from "./Inventory";
import House from "./House";

@Index("fk_House_id", ["fkHouseId"], {})
@Index("fk_Inventory_id", ["fkInventoryId"], {})
@Entity("HouseInventory")
export default class HouseInventory {
  @Column("int", { primary: true, name: "id" })
  public id!: number;

  @Column("int", { name: "fk_Inventory_id" })
  public fkInventoryId!: number;

  @Column("int", { name: "fk_House_id" })
  public fkHouseId!: number;

  @ManyToOne(() => Inventory, (inventory) => inventory.houseInventories, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
    lazy: true,
  })
  @JoinColumn([{ name: "fk_Inventory_id", referencedColumnName: "id" }])
  public fkInventory!: Promise<Inventory>;

  @ManyToOne(() => House, (house) => house.houseInventories, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
    lazy: true,
  })
  @JoinColumn([{ name: "fk_House_id", referencedColumnName: "id" }])
  public fkHouse!: Promise<House>;
}
