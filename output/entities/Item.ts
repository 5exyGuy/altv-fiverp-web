import { Column, Entity, OneToMany } from "typeorm";
import InventoryItem from "./InventoryItem";

@Entity("Item")
export default class Item {
  @Column("varchar", { name: "name", length: 255 })
  public name!: string;

  @Column("binary", { name: "hash", length: 1 })
  public hash!: Buffer;

  @Column("double", { name: "weight", precision: 22 })
  public weight!: number;

  @Column("int", { primary: true, name: "id" })
  public id!: number;

  @OneToMany(() => InventoryItem, (inventoryItem) => inventoryItem.fkItem, {
    lazy: true,
  })
  public inventoryItems!: Promise<InventoryItem[]>;
}
