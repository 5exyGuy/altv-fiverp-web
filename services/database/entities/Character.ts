import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
} from "typeorm";
import { User } from "./User";
import { CharacterApartment } from "./CharacterApartment";
import { CharacterBusiness } from "./CharacterBusiness";
import { CharacterHouse } from "./CharacterHouse";
import { CharacterInventory } from "./CharacterInventory";
import { CharacterSkill } from "./CharacterSkill";
import { CharacterVehicle } from "./CharacterVehicle";
import { Contact } from "./Contact";
import { Faction } from "./Faction";
import { FactionMember } from "./FactionMember";
import { Message } from "./Message";

@Index("fk_Characters_Users", ["userId"], {})
@Entity("character", { schema: "fiverp" })
export class Character {
    @Column("int", { primary: true, name: "id" })
    id: number;

    @Column("int", { name: "userId" })
    userId: number;

    @Column("varchar", { name: "firstName", length: 255 })
    firstName: string;

    @Column("varchar", { name: "lastName", length: 255 })
    lastName: string;

    @Column("bigint", { name: "cash" })
    cash: string;

    @Column("bigint", { name: "bank" })
    bank: string;

    @Column("smallint", { name: "dead" })
    dead: number;

    @Column("varchar", { name: "phoneNumber", length: 255 })
    phoneNumber: string;

    @Column("longtext", { name: "equipment" })
    equipment: string;

    @Column("smallint", { name: "health" })
    health: number;

    @Column("smallint", { name: "armor" })
    armor: number;

    @Column("int", { name: "arrestTime" })
    arrestTime: number;

    @Column("int", { name: "dimension" })
    dimension: number;

    @Column("longtext", { name: "lastPosition" })
    lastPosition: string;

    @ManyToOne(() => User, (user) => user.characters, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    })
    @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
    user: User;

    @OneToMany(
        () => CharacterApartment,
        (characterapartment) => characterapartment.character
    )
    characterApartments: CharacterApartment[];

    @OneToMany(
        () => CharacterBusiness,
        (characterbusiness) => characterbusiness.character
    )
    characterBusinesses: CharacterBusiness[];

    @OneToMany(
        () => CharacterHouse,
        (characterhouse) => characterhouse.character
    )
    characterHouses: CharacterHouse[];

    @OneToMany(
        () => CharacterInventory,
        (characterinventory) => characterinventory.character
    )
    characterInventories: CharacterInventory[];

    @OneToMany(
        () => CharacterSkill,
        (characterskill) => characterskill.character
    )
    characterSkills: CharacterSkill[];

    @OneToMany(
        () => CharacterVehicle,
        (charactervehicle) => charactervehicle.character
    )
    characterVehicles: CharacterVehicle[];

    @OneToMany(() => Contact, (contact) => contact.character)
    contacts: Contact[];

    @OneToMany(() => Faction, (faction) => faction.manager)
    factions: Faction[];

    @OneToOne(() => FactionMember, (factionmember) => factionmember.character)
    factionMembers: FactionMember;

    @OneToMany(() => Message, (message) => message.sender)
    sentMessages: Message[];

    @OneToMany(() => Message, (message) => message.receiver)
    receivedMessages: Message[];
}
