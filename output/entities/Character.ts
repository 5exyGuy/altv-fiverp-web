import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
} from "typeorm";
import User from "./User";
import CharacterApartment from "./CharacterApartment";
import CharacterBusiness from "./CharacterBusiness";
import CharacterHouse from "./CharacterHouse";
import CharacterInventory from "./CharacterInventory";
import CharacterSkill from "./CharacterSkill";
import CharacterVehicle from "./CharacterVehicle";
import Contact from "./Contact";
import Faction from "./Faction";
import FactionMember from "./FactionMember";
import Message from "./Message";

@Index("fk_User_id", ["fkUserId"], { unique: true })
@Entity("Character")
export default class Character {
  @Column("varchar", { name: "firstName", length: 255 })
  public firstName!: string;

  @Column("varchar", { name: "lastName", length: 255 })
  public lastName!: string;

  @Column("bigint", { name: "cash" })
  public cash!: string;

  @Column("bigint", { name: "bank" })
  public bank!: string;

  @Column("tinyint", { name: "dead", width: 1 })
  public dead!: boolean;

  @Column("varchar", { name: "phoneNumber", length: 255 })
  public phoneNumber!: string;

  @Column("smallint", { name: "health" })
  public health!: number;

  @Column("smallint", { name: "armor" })
  public armor!: number;

  @Column("int", { name: "arrestTime" })
  public arrestTime!: number;

  @Column("int", { name: "dimension" })
  public dimension!: number;

  @Column("json", { name: "lastPosition" })
  public lastPosition!: object;

  @Column("json", { name: "lastRotation" })
  public lastRotation!: object;

  @Column("int", { primary: true, name: "id" })
  public id!: number;

  @Column("int", { name: "fk_User_id", unique: true })
  public fkUserId!: number;

  @OneToOne(() => User, (user) => user.character, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
    lazy: true,
  })
  @JoinColumn([{ name: "fk_User_id", referencedColumnName: "id" }])
  public fkUser!: Promise<User>;

  @OneToMany(
    () => CharacterApartment,
    (characterApartment) => characterApartment.fkCharacter,
    { lazy: true }
  )
  public characterApartments!: Promise<CharacterApartment[]>;

  @OneToMany(
    () => CharacterBusiness,
    (characterBusiness) => characterBusiness.fkCharacter,
    { lazy: true }
  )
  public characterBusinesses!: Promise<CharacterBusiness[]>;

  @OneToMany(
    () => CharacterHouse,
    (characterHouse) => characterHouse.fkCharacter,
    { lazy: true }
  )
  public characterHouses!: Promise<CharacterHouse[]>;

  @OneToMany(
    () => CharacterInventory,
    (characterInventory) => characterInventory.fkCharacter,
    { lazy: true }
  )
  public characterInventories!: Promise<CharacterInventory[]>;

  @OneToMany(
    () => CharacterSkill,
    (characterSkill) => characterSkill.fkCharacter,
    { lazy: true }
  )
  public characterSkills!: Promise<CharacterSkill[]>;

  @OneToMany(
    () => CharacterVehicle,
    (characterVehicle) => characterVehicle.fkCharacter,
    { lazy: true }
  )
  public characterVehicles!: Promise<CharacterVehicle[]>;

  @OneToMany(() => Contact, (contact) => contact.fkCharacterHolder, {
    lazy: true,
  })
  public contacts!: Promise<Contact[]>;

  @OneToOne(() => Contact, (contact) => contact.fkCharacterContact, {
    lazy: true,
  })
  public contact!: Promise<Contact>;

  @OneToOne(() => Faction, (faction) => faction.fkCharacter, { lazy: true })
  public faction!: Promise<Faction>;

  @OneToMany(
    () => FactionMember,
    (factionMember) => factionMember.fkCharacter,
    { lazy: true }
  )
  public factionMembers!: Promise<FactionMember[]>;

  @OneToMany(() => Message, (message) => message.fkCharacterSender, {
    lazy: true,
  })
  public messages!: Promise<Message[]>;

  @OneToOne(() => Message, (message) => message.fkCharacterReceiver, {
    lazy: true,
  })
  public message!: Promise<Message>;
}
