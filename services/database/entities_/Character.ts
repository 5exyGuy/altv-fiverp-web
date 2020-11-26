import { BaseEntity, Column, Entity, Index, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { User } from './User';
import { CharacterApartment } from './CharacterApartment';
import { CharacterBusiness } from './CharacterBusiness';
import { CharacterHouse } from './CharacterHouse';
import { CharacterInventory } from './CharacterInventory';
import { CharacterSkill } from './CharacterSkill';
import { CharacterVehicle } from './CharacterVehicle';
import { Contact } from './Contact';
import { Faction } from './Faction';
import { FactionMember } from './FactionMember';
import { Message } from './Message';

@Index('fk_User_id', ['fkUserId'], { unique: true })
@Entity('Character', { schema: 'test' })
export class Character extends BaseEntity {
    @Column('varchar', { name: 'firstName', length: 255 })
    firstName: string;

    @Column('varchar', { name: 'lastName', length: 255 })
    lastName: string;

    @Column('bigint', { name: 'cash' })
    cash: string;

    @Column('bigint', { name: 'bank' })
    bank: string;

    @Column('tinyint', { name: 'dead', width: 1 })
    dead: boolean;

    @Column('varchar', { name: 'phoneNumber', length: 255 })
    phoneNumber: string;

    @Column('smallint', { name: 'health' })
    health: number;

    @Column('smallint', { name: 'armor' })
    armor: number;

    @Column('int', { name: 'arrestTime' })
    arrestTime: number;

    @Column('int', { name: 'dimension' })
    dimension: number;

    @Column('json', { name: 'lastPosition' })
    lastPosition: object;

    @Column('json', { name: 'lastRotation' })
    lastRotation: object;

    @Column('int', { primary: true, name: 'id' })
    id: number;

    @Column('int', { name: 'fk_User_id', unique: true })
    fkUserId: number;

    @OneToOne(() => User, (user) => user.characters, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    })
    @JoinColumn([{ name: 'fk_User_id', referencedColumnName: 'id' }])
    fkUser: User;

    @OneToMany(() => CharacterApartment, (characterApartment) => characterApartment.fkCharacter)
    characterApartments: CharacterApartment[];

    @OneToMany(() => CharacterBusiness, (characterBusiness) => characterBusiness.fkCharacter)
    characterBusinesses: CharacterBusiness[];

    @OneToMany(() => CharacterHouse, (characterHouse) => characterHouse.fkCharacter)
    characterHouses: CharacterHouse[];

    @OneToMany(() => CharacterInventory, (characterInventory) => characterInventory.fkCharacter)
    characterInventories: CharacterInventory[];

    @OneToMany(() => CharacterSkill, (characterSkill) => characterSkill.fkCharacter)
    characterSkills: CharacterSkill[];

    @OneToMany(() => CharacterVehicle, (characterVehicle) => characterVehicle.fkCharacter)
    characterVehicles: CharacterVehicle[];

    @OneToMany(() => Contact, (contact) => contact.fkCharacterHolder)
    contacts: Contact[];

    @OneToOne(() => Contact, (contact) => contact.fkCharacterContact)
    contact: Contact;

    @OneToOne(() => Faction, (faction) => faction.fkCharacter)
    faction: Faction;

    @OneToMany(() => FactionMember, (factionMember) => factionMember.fkCharacter)
    factionMembers: FactionMember[];

    @OneToMany(() => Message, (message) => message.fkCharacterSender)
    messages: Message[];
}
