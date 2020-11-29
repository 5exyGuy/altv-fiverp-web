import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import Character from "./Character";
import Faction from "./Faction";

@Index("fk_Character_id", ["fkCharacterId"], {})
@Index("fk_Faction_id", ["fkFactionId"], {})
@Entity("FactionMember")
export default class FactionMember {
  @Column("datetime", { name: "joinDate" })
  public joinDate!: Date;

  @Column("int", { primary: true, name: "id" })
  public id!: number;

  @Column("int", { name: "fk_Character_id" })
  public fkCharacterId!: number;

  @Column("int", { name: "fk_Faction_id" })
  public fkFactionId!: number;

  @ManyToOne(() => Character, (character) => character.factionMembers, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
    lazy: true,
  })
  @JoinColumn([{ name: "fk_Character_id", referencedColumnName: "id" }])
  public fkCharacter!: Promise<Character>;

  @ManyToOne(() => Faction, (faction) => faction.factionMembers, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
    lazy: true,
  })
  @JoinColumn([{ name: "fk_Faction_id", referencedColumnName: "id" }])
  public fkFaction!: Promise<Faction>;
}
