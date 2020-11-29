import User from './User';
import CharacterApartment from './CharacterApartment';
import CharacterBusiness from './CharacterBusiness';
import CharacterHouse from './CharacterHouse';
import CharacterInventory from './CharacterInventory';
import CharacterSkill from './CharacterSkill';
import CharacterVehicle from './CharacterVehicle';
import Contact from './Contact';
import Faction from './Faction';
import FactionMember from './FactionMember';
import Message from './Message';

export default class Character {
    public firstName: string;
    public lastName: string;
    public cash: string;
    public bank: string;
    public dead: boolean;
    public phoneNumber: string;
    public health: number;
    public armor: number;
    public arrestTime: number;
    public dimension: number;
    public lastPosition: string;
    public lastRotation: string;
    public id: number;
    public fk_User_id: number;
    public User: User;
    public CharacterApartment: CharacterApartment[];
    public CharacterBusiness: CharacterBusiness[];
    public CharacterHouse: CharacterHouse[];
    public CharacterInventory: CharacterInventory[];
    public CharacterSkill: CharacterSkill[];
    public CharacterVehicle: CharacterVehicle[];
    public Contact_CharacterToContact_fk_Character_id: Contact;
    public Contact_CharacterToContact_fk_Character_id1: Contact[];
    public Faction: Faction;
    public FactionMember: FactionMember[];
    public Message_CharacterToMessage_fk_Character_id: Message;
    public Message_CharacterToMessage_fk_Character_id1: Message[];
}
