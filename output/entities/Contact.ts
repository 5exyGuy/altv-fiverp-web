import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";
import Character from "./Character";

@Index("fk_CharacterContact_id", ["fkCharacterContactId"], { unique: true })
@Index("fk_CharacterHolder_id", ["fkCharacterHolderId"], {})
@Entity("Contact")
export default class Contact {
  @Column("int", { primary: true, name: "id" })
  public id!: number;

  @Column("int", { name: "fk_CharacterHolder_id" })
  public fkCharacterHolderId!: number;

  @Column("int", { name: "fk_CharacterContact_id", unique: true })
  public fkCharacterContactId!: number;

  @ManyToOne(() => Character, (character) => character.contacts, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
    lazy: true,
  })
  @JoinColumn([{ name: "fk_CharacterHolder_id", referencedColumnName: "id" }])
  public fkCharacterHolder!: Promise<Character>;

  @OneToOne(() => Character, (character) => character.contact, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
    lazy: true,
  })
  @JoinColumn([{ name: "fk_CharacterContact_id", referencedColumnName: "id" }])
  public fkCharacterContact!: Promise<Character>;
}
