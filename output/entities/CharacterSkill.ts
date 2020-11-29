import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import Skill from "./Skill";
import Character from "./Character";

@Index("fk_Character_id", ["fkCharacterId"], {})
@Index("fk_Skill_id", ["fkSkillId"], {})
@Entity("CharacterSkill")
export default class CharacterSkill {
  @Column("smallint", { name: "level" })
  public level!: number;

  @Column("bigint", { name: "xp" })
  public xp!: string;

  @Column("int", { primary: true, name: "id" })
  public id!: number;

  @Column("int", { name: "fk_Skill_id" })
  public fkSkillId!: number;

  @Column("int", { name: "fk_Character_id" })
  public fkCharacterId!: number;

  @ManyToOne(() => Skill, (skill) => skill.characterSkills, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
    lazy: true,
  })
  @JoinColumn([{ name: "fk_Skill_id", referencedColumnName: "id" }])
  public fkSkill!: Promise<Skill>;

  @ManyToOne(() => Character, (character) => character.characterSkills, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
    lazy: true,
  })
  @JoinColumn([{ name: "fk_Character_id", referencedColumnName: "id" }])
  public fkCharacter!: Promise<Character>;
}
