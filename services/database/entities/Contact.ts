import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Character } from "./Character";

@Index("fk_Contacts_Characters_1", ["characterId"], {})
@Index("fk_Contacts_Characters_2", ["contactId"], {})
@Entity("contact", { schema: "fiverp" })
export class Contact {
    @Column("int", { primary: true, name: "id" })
    id: number;

    @Column("int", { name: "characterId" })
    characterId: number;

    @Column("int", { name: "contactId" })
    contactId: number;

    @ManyToOne(() => Character, (character) => character.contacts, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    })
    @JoinColumn([{ name: "characterId", referencedColumnName: "id" }])
    character: Character;

    @ManyToOne(() => Character, (character) => character.contacts2, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    })
    @JoinColumn([{ name: "contactId", referencedColumnName: "id" }])
    contact: Character;
}
