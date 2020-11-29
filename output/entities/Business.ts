import { Column, Entity, OneToMany } from "typeorm";
import BusinessInventory from "./BusinessInventory";
import CharacterBusiness from "./CharacterBusiness";

@Entity("Business")
export default class Business {
  @Column("int", { name: "price" })
  public price!: number;

  @Column("varchar", { name: "lockState", length: 255 })
  public lockState!: string;

  @Column("json", { name: "location" })
  public location!: object;

  @Column("int", { primary: true, name: "id" })
  public id!: number;

  @OneToMany(
    () => BusinessInventory,
    (businessInventory) => businessInventory.fkBusiness,
    { lazy: true }
  )
  public businessInventories!: Promise<BusinessInventory[]>;

  @OneToMany(
    () => CharacterBusiness,
    (characterBusiness) => characterBusiness.fkBusiness,
    { lazy: true }
  )
  public characterBusinesses!: Promise<CharacterBusiness[]>;
}
