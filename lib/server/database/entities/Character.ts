import User from './User';
import Contact from './Contact';
import Faction from './Faction';
import Message from './Message';
import Entity from '../Entity';
import Apartment from './Apartment';
import Business from './Business';
import House from './House';
import Inventory from './Inventory';
import Skill from './Skill';
import Vehicle from './Vehicle';

export default class Character extends Entity<Character> {
    private _firstName: string;
    private _lastName: string;
    private _cash: number;
    private _bank: number;
    private _dead: boolean;
    private _phoneNumber: string;
    private _health: number;
    private _armor: number;
    private _arrestTime: number;
    private _dimension: number;
    private _lastPosition: string;
    private _id: number;
    private _userId: number;
    private _user: User;
    private _apartments: Array<Apartment>;
    private _characterBusinesses: Array<Business>;
    private _characterHouses: Array<House>;
    private _characterInventory: Inventory;
    private _characterSkills: Array<Skill>;
    private _characterVehicles: Array<Vehicle>;
    private _contacts: Contact[];
    private _contacts2: Contact[];
    private _faction: Faction;
    private _messages: Message[];
    private _messages2: Message[];
}
