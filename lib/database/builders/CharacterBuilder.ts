import Character from '../entities/Character';
import CharacterApartment from '../entities/CharacterApartment';
import CharacterBusiness from '../entities/CharacterBusiness';
import CharacterHouse from '../entities/CharacterHouse';
import CharacterInventory from '../entities/CharacterInventory';
import CharacterSkill from '../entities/CharacterSkill';
import CharacterVehicle from '../entities/CharacterVehicle';
import Contact from '../entities/Contact';
import Faction from '../entities/Faction';
import FactionMember from '../entities/FactionMember';
import Message from '../entities/Message';
import User from '../entities/User';
import EntityBuilder from '../EntityBuilder';
import CharacterApartmentBuilder from './CharacterApartmentBuilder';
import CharacterBusinessBuilder from './CharacterBusinessBuilder';
import CharacterHouseBuilder from './CharacterHouseBuilder';
import CharacterInventoryBuilder from './CharacterInventoryBuilder';
import CharacterSkillBuilder from './CharacterSkillBuilder';
import CharacterVehicleBuilder from './CharacterVehicleBuilder';
import ContactBuilder from './ContactBuilder';
import FactionBuilder from './FactionBuilder';
import FactionMemberBuilder from './FactionMemberBuilder';
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

    public addBusinessInventory(characterApartment: CharacterApartment | CharacterApartmentBuilder): CharacterBuilder {
        if (!this._entity.CharacterApartment) this._entity.CharacterApartment = new Array<CharacterApartment>();
        if (characterApartment instanceof CharacterApartmentBuilder)
            characterApartment = <CharacterApartment>characterApartment.build();
        this._entity.CharacterApartment.push(characterApartment);
        return this;
    }

    public addCharacterBusiness(characterBusiness: CharacterBusiness | CharacterBusinessBuilder): CharacterBuilder {
        if (!this._entity.CharacterBusiness) this._entity.CharacterBusiness = new Array<CharacterBusiness>();
        if (characterBusiness instanceof CharacterBusinessBuilder)
            characterBusiness = <CharacterBusiness>characterBusiness.build();
        this._entity.CharacterBusiness.push(characterBusiness);
        return this;
    }

    public addCharacterHouse(characterHouse: CharacterHouse | CharacterHouseBuilder): CharacterBuilder {
        if (!this._entity.CharacterHouse) this._entity.CharacterHouse = new Array<CharacterHouse>();
        if (characterHouse instanceof CharacterHouseBuilder) characterHouse = <CharacterHouse>characterHouse.build();
        this._entity.CharacterHouse.push(characterHouse);
        return this;
    }

    public addCharacterInventory(characterInventory: CharacterInventory | CharacterInventoryBuilder): CharacterBuilder {
        if (!this._entity.CharacterInventory) this._entity.CharacterInventory = new Array<CharacterInventory>();
        if (characterInventory instanceof CharacterInventoryBuilder)
            characterInventory = <CharacterInventory>characterInventory.build();
        this._entity.CharacterInventory.push(characterInventory);
        return this;
    }

    public addCharacterSkill(characterSkill: CharacterSkill | CharacterSkillBuilder): CharacterBuilder {
        if (!this._entity.CharacterSkill) this._entity.CharacterSkill = new Array<CharacterSkill>();
        if (characterSkill instanceof CharacterSkillBuilder) characterSkill = <CharacterSkill>characterSkill.build();
        this._entity.CharacterSkill.push(characterSkill);
        return this;
    }

    public addCharacterVehicle(characterVehicle: CharacterVehicle | CharacterVehicleBuilder): CharacterBuilder {
        if (!this._entity.CharacterVehicle) this._entity.CharacterVehicle = new Array<CharacterVehicle>();
        if (characterVehicle instanceof CharacterVehicleBuilder)
            characterVehicle = <CharacterVehicle>characterVehicle.build();
        this._entity.CharacterVehicle.push(characterVehicle);
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

    public addFactionMember(factionMember: FactionMember | FactionMemberBuilder): CharacterBuilder {
        if (!this._entity.FactionMember) this._entity.FactionMember = new Array<FactionMember>();
        if (factionMember instanceof FactionMemberBuilder) factionMember = <FactionMember>factionMember.build();
        this._entity.FactionMember.push(factionMember);
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
