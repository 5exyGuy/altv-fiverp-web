import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import Apartment from "./Apartment";
import Inventory from "./Inventory";

@Index("fk_Apartment_id", ["fkApartmentId"], {})
@Index("fk_Inventory_id", ["fkInventoryId"], {})
@Entity("ApartmentInventory")
export default class ApartmentInventory {
  @Column("int", { primary: true, name: "id" })
  public id!: number;

  @Column("int", { name: "fk_Apartment_id" })
  public fkApartmentId!: number;

  @Column("int", { name: "fk_Inventory_id" })
  public fkInventoryId!: number;

  @ManyToOne(() => Apartment, (apartment) => apartment.apartmentInventories, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
    lazy: true,
  })
  @JoinColumn([{ name: "fk_Apartment_id", referencedColumnName: "id" }])
  public fkApartment!: Promise<Apartment>;

  @ManyToOne(() => Inventory, (inventory) => inventory.apartmentInventories, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
    lazy: true,
  })
  @JoinColumn([{ name: "fk_Inventory_id", referencedColumnName: "id" }])
  public fkInventory!: Promise<Inventory>;
}
