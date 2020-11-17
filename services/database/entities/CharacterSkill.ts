import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Skill } from "./Skill";
import { Character } from "./Character";

@Index("fk_Skills_Characters", ["characterId"], {})
@Index("fk_CharacterSkills_Skills", ["skillId"], {})
@Entity("characterskill", { schema: "fiverp" })
export class CharacterSkill {
    @Column("int", { primary: true, name: "id" })
    id: number;

    @Column("int", { name: "skillId" })
    skillId: number;

    @Column("int", { name: "characterId" })
    characterId: number;

    @Column("smallint", { name: "level" })
    level: number;

    @Column("bigint", { name: "xp" })
    xp: string;

    @ManyToOne(() => Skill, (skill) => skill.characterskills, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    })
    @JoinColumn([{ name: "skillId", referencedColumnName: "id" }])
    skill: Skill;

    @ManyToOne(() => Character, (character) => character.characterskills, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    })
    @JoinColumn([{ name: "characterId", referencedColumnName: "id" }])
    character: Character;
}
