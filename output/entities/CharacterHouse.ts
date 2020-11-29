import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import House from "./House";
import Character from "./Character";

@Index("fk_Character_id", ["fkCharacterId"], {})
@Index("fk_House_id", ["fkHouseId"], {})
@Entity("CharacterHouse")
export default class CharacterHouse {
  @Column("int", { primary: true, name: "id" })
  public id!: number;

  @Column("int", { name: "fk_House_id" })
  public fkHouseId!: number;

  @Column("int", { name: "fk_Character_id" })
  public fkCharacterId!: number;

  @ManyToOne(() => House, (house) => house.characterHouses, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
    lazy: true,
  })
  @JoinColumn([{ name: "fk_House_id", referencedColumnName: "id" }])
  public fkHouse!: Promise<House>;

  @ManyToOne(() => Character, (character) => character.characterHouses, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
    lazy: true,
  })
  @JoinColumn([{ name: "fk_Character_id", referencedColumnName: "id" }])
  public fkCharacter!: Promise<Character>;
}
