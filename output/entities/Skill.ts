import { Column, Entity, OneToMany } from "typeorm";
import CharacterSkill from "./CharacterSkill";

@Entity("Skill")
export default class Skill {
  @Column("varchar", { name: "name", length: 255 })
  public name!: string;

  @Column("binary", { name: "hash", length: 1 })
  public hash!: Buffer;

  @Column("smallint", { name: "maxLevel" })
  public maxLevel!: number;

  @Column("int", { primary: true, name: "id" })
  public id!: number;

  @OneToMany(() => CharacterSkill, (characterSkill) => characterSkill.fkSkill, {
    lazy: true,
  })
  public characterSkills!: Promise<CharacterSkill[]>;
}
