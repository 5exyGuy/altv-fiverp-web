import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import Business from "./Business";
import Character from "./Character";

@Index("fk_Business_id", ["fkBusinessId"], {})
@Index("fk_Character_id", ["fkCharacterId"], {})
@Entity("CharacterBusiness")
export default class CharacterBusiness {
  @Column("int", { primary: true, name: "id" })
  public id!: number;

  @Column("int", { name: "fk_Business_id" })
  public fkBusinessId!: number;

  @Column("int", { name: "fk_Character_id" })
  public fkCharacterId!: number;

  @ManyToOne(() => Business, (business) => business.characterBusinesses, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
    lazy: true,
  })
  @JoinColumn([{ name: "fk_Business_id", referencedColumnName: "id" }])
  public fkBusiness!: Promise<Business>;

  @ManyToOne(() => Character, (character) => character.characterBusinesses, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
    lazy: true,
  })
  @JoinColumn([{ name: "fk_Character_id", referencedColumnName: "id" }])
  public fkCharacter!: Promise<Character>;
}
