import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
} from "typeorm";
import Character from "./Character";
import FactionMember from "./FactionMember";

@Index("fk_Character_id", ["fkCharacterId"], { unique: true })
@Entity("Faction")
export default class Faction {
  @Column("varchar", { name: "name", length: 255 })
  public name!: string;

  @Column("datetime", { name: "registrationDate" })
  public registrationDate!: Date;

  @Column("int", { primary: true, name: "id" })
  public id!: number;

  @Column("int", { name: "fk_Character_id", unique: true })
  public fkCharacterId!: number;

  @OneToOne(() => Character, (character) => character.faction, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
    lazy: true,
  })
  @JoinColumn([{ name: "fk_Character_id", referencedColumnName: "id" }])
  public fkCharacter!: Promise<Character>;

  @OneToMany(() => FactionMember, (factionMember) => factionMember.fkFaction, {
    lazy: true,
  })
  public factionMembers!: Promise<FactionMember[]>;
}
