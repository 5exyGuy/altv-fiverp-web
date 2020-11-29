import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import Business from "./Business";
import Inventory from "./Inventory";

@Index("fk_Business_id", ["fkBusinessId"], {})
@Index("fk_Inventory_id", ["fkInventoryId"], {})
@Entity("BusinessInventory")
export default class BusinessInventory {
  @Column("int", { primary: true, name: "id" })
  public id!: number;

  @Column("int", { name: "fk_Business_id" })
  public fkBusinessId!: number;

  @Column("int", { name: "fk_Inventory_id" })
  public fkInventoryId!: number;

  @ManyToOne(() => Business, (business) => business.businessInventories, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
    lazy: true,
  })
  @JoinColumn([{ name: "fk_Business_id", referencedColumnName: "id" }])
  public fkBusiness!: Promise<Business>;

  @ManyToOne(() => Inventory, (inventory) => inventory.businessInventories, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
    lazy: true,
  })
  @JoinColumn([{ name: "fk_Inventory_id", referencedColumnName: "id" }])
  public fkInventory!: Promise<Inventory>;
}
