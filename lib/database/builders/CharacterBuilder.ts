import Character from '../entities/Character';
import Contact from '../entities/Contact';
import Faction from '../entities/Faction';
import Message from '../entities/Message';
import User from '../entities/User';
import EntityBuilder from '../EntityBuilder';
import ContactBuilder from './ContactBuilder';
import FactionBuilder from './FactionBuilder';
import MessageBuilder from './MessageBuilder';
import UserBuilder from './UserBuilder';

export default class CharacterBuilder extends EntityBuilder {
    protected _entity: Character;

    public setFirstName(firstName: string): CharacterBuilder {
        this._entity.firstName = firstName;
        return this;
    }

    public setLastName(lastName: string): CharacterBuilder {
        this._entity.lastName = lastName;
        return this;
    }

    public setCash(cash: number): CharacterBuilder {
        this._entity.cash = cash;
        return this;
    }

    public setBank(bank: number): CharacterBuilder {
        this._entity.bank = bank;
        return this;
    }

    public setDead(dead: boolean): CharacterBuilder {
        this._entity.dead = dead;
        return this;
    }

    public setPhoneNumber(phoneNumber: string): CharacterBuilder {
        this._entity.phoneNumber = phoneNumber;
        return this;
    }

    public setHealth(health: number): CharacterBuilder {
        this._entity.health = health;
        return this;
    }

    public setArmor(armor: number): CharacterBuilder {
        this._entity.armor = armor;
        return this;
    }

    public setArrestTime(arrestTime: number): CharacterBuilder {
        this._entity.arrestTime = arrestTime;
        return this;
    }

    public setDimension(dimension: number): CharacterBuilder {
        this._entity.dimension = dimension;
        return this;
    }

    public setLastPosition(lastPosition: string): CharacterBuilder {
        this._entity.lastPosition = lastPosition;
        return this;
    }

    public setLastRotation(lastRotation: string): CharacterBuilder {
        this._entity.lastRotation = lastRotation;
        return this;
    }

    public setId(id: number): CharacterBuilder {
        this._entity.id = id;
        return this;
    }

    public setUserId(id: number): CharacterBuilder {
        this._entity.fk_User_id = id;
        return this;
    }

    public setUser(user: User | UserBuilder): CharacterBuilder {
        if (user instanceof UserBuilder) user = <User>user.build();
        this._entity.User = user;
        return this;
    }

    public addContact(contact: Contact | ContactBuilder): CharacterBuilder {
        if (!this._entity.Contact_CharacterToContact_fk_Character_id1)
            this._entity.Contact_CharacterToContact_fk_Character_id1 = new Array<Contact>();
        if (contact instanceof ContactBuilder) contact = <Contact>contact.build();
        this._entity.Contact_CharacterToContact_fk_Character_id1.push(contact);
        return this;
    }

    public setFaction(faction: Faction | FactionBuilder): CharacterBuilder {
        if (faction instanceof FactionBuilder) faction = <Faction>faction.build();
        this._entity.Faction = faction;
        return this;
    }

    public addMessage(message: Message | MessageBuilder): CharacterBuilder {
        if (!this._entity.Message_CharacterToMessage_fk_Character_id1)
            this._entity.Message_CharacterToMessage_fk_Character_id1 = new Array<Message>();
        if (message instanceof MessageBuilder) message = <Message>message.build();
        this._entity.Message_CharacterToMessage_fk_Character_id1.push(message);
        return this;
    }
}
