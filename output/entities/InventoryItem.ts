import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import Item from "./Item";
import Inventory from "./Inventory";

@Index("fk_Inventory_id", ["fkInventoryId"], {})
@Index("fk_Item_id", ["fkItemId"], {})
@Entity("InventoryItem")
export default class InventoryItem {
  @Column("smallint", { name: "slot" })
  public slot!: number;

  @Column("smallint", { name: "amount" })
  public amount!: number;

  @Column("int", { primary: true, name: "id" })
  public id!: number;

  @Column("int", { name: "fk_Item_id" })
  public fkItemId!: number;

  @Column("int", { name: "fk_Inventory_id" })
  public fkInventoryId!: number;

  @ManyToOne(() => Item, (item) => item.inventoryItems, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
    lazy: true,
  })
  @JoinColumn([{ name: "fk_Item_id", referencedColumnName: "id" }])
  public fkItem!: Promise<Item>;

  @ManyToOne(() => Inventory, (inventory) => inventory.inventoryItems, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
    lazy: true,
  })
  @JoinColumn([{ name: "fk_Inventory_id", referencedColumnName: "id" }])
  public fkInventory!: Promise<Inventory>;
}
