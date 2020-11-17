import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Character } from "./Character";

@Index("fk_Messages_Characters_1", ["senderId"], {})
@Index("fk_Messages_Characters_2", ["receiverId"], {})
@Entity("message", { schema: "fiverp" })
export class Message {
    @Column("int", { primary: true, name: "id" })
    id: number;

    @Column("int", { name: "senderId" })
    senderId: number;

    @Column("int", { name: "receiverId" })
    receiverId: number;

    @Column("datetime", { name: "date" })
    date: Date;

    @Column("longtext", { name: "content" })
    content: string;

    @ManyToOne(() => Character, (character) => character.messages, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    })
    @JoinColumn([{ name: "senderId", referencedColumnName: "id" }])
    sender: Character;

    @ManyToOne(() => Character, (character) => character.messages2, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    })
    @JoinColumn([{ name: "receiverId", referencedColumnName: "id" }])
    receiver: Character;
}
