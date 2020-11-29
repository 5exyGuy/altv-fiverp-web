import { Column, Entity, OneToMany } from "typeorm";
import ApartmentInventory from "./ApartmentInventory";
import CharacterApartment from "./CharacterApartment";

@Entity("Apartment")
export default class Apartment {
  @Column("int", { name: "price" })
  public price!: number;

  @Column("varchar", { name: "lockState", length: 255 })
  public lockState!: string;

  @Column("json", { name: "location" })
  public location!: object;

  @Column("int", { primary: true, name: "id" })
  public id!: number;

  @OneToMany(
    () => ApartmentInventory,
    (apartmentInventory) => apartmentInventory.fkApartment,
    { lazy: true }
  )
  public apartmentInventories!: Promise<ApartmentInventory[]>;

  @OneToMany(
    () => CharacterApartment,
    (characterApartment) => characterApartment.fkApartment,
    { lazy: true }
  )
  public characterApartments!: Promise<CharacterApartment[]>;
}
