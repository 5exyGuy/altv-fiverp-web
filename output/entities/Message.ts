import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";
import Character from "./Character";

@Index("fk_CharacterReceiver_id", ["fkCharacterReceiverId"], { unique: true })
@Index("fk_CharacterSender_id", ["fkCharacterSenderId"], {})
@Entity("Message")
export default class Message {
  @Column("longtext", { name: "content" })
  public content!: string;

  @Column("datetime", { name: "date" })
  public date!: Date;

  @Column("int", { primary: true, name: "id" })
  public id!: number;

  @Column("int", { name: "fk_CharacterSender_id" })
  public fkCharacterSenderId!: number;

  @Column("int", { name: "fk_CharacterReceiver_id", unique: true })
  public fkCharacterReceiverId!: number;

  @ManyToOne(() => Character, (character) => character.messages, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
    lazy: true,
  })
  @JoinColumn([{ name: "fk_CharacterSender_id", referencedColumnName: "id" }])
  public fkCharacterSender!: Promise<Character>;

  @OneToOne(() => Character, (character) => character.message, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
    lazy: true,
  })
  @JoinColumn([{ name: "fk_CharacterReceiver_id", referencedColumnName: "id" }])
  public fkCharacterReceiver!: Promise<Character>;
}
