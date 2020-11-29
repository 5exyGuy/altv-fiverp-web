import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import Apartment from "./Apartment";
import Character from "./Character";

@Index("fk_Apartment_id", ["fkApartmentId"], {})
@Index("fk_Character_id", ["fkCharacterId"], {})
@Entity("CharacterApartment")
export default class CharacterApartment {
  @Column("int", { primary: true, name: "id" })
  public id!: number;

  @Column("int", { name: "fk_Apartment_id" })
  public fkApartmentId!: number;

  @Column("int", { name: "fk_Character_id" })
  public fkCharacterId!: number;

  @ManyToOne(() => Apartment, (apartment) => apartment.characterApartments, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
    lazy: true,
  })
  @JoinColumn([{ name: "fk_Apartment_id", referencedColumnName: "id" }])
  public fkApartment!: Promise<Apartment>;

  @ManyToOne(() => Character, (character) => character.characterApartments, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
    lazy: true,
  })
  @JoinColumn([{ name: "fk_Character_id", referencedColumnName: "id" }])
  public fkCharacter!: Promise<Character>;
}
