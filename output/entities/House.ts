import { Column, Entity, OneToMany } from "typeorm";
import CharacterHouse from "./CharacterHouse";
import HouseInventory from "./HouseInventory";

@Entity("House")
export default class House {
  @Column("int", { name: "price" })
  public price!: number;

  @Column("varchar", { name: "lockState", length: 255 })
  public lockState!: string;

  @Column("json", { name: "location" })
  public location!: object;

  @Column("int", { primary: true, name: "id" })
  public id!: number;

  @OneToMany(() => CharacterHouse, (characterHouse) => characterHouse.fkHouse, {
    lazy: true,
  })
  public characterHouses!: Promise<CharacterHouse[]>;

  @OneToMany(() => HouseInventory, (houseInventory) => houseInventory.fkHouse, {
    lazy: true,
  })
  public houseInventories!: Promise<HouseInventory[]>;
}
