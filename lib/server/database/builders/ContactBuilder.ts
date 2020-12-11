import Character from '../entities/Character';
import Contact from '../entities/Contact';
import EntityBuilder from '../EntityBuilder';
import CharacterBuilder from './CharacterBuilder';

export default class ContactBuilder extends EntityBuilder {
    protected _entity: Contact = new Contact();

    public setId(id: number): ContactBuilder {
        this._entity.id = id;
        return this;
    }

    public setHolderId(id: number): ContactBuilder {
        this._entity.fk_Character_id = id;
        return this;
    }

    public setContactId(id: number): ContactBuilder {
        this._entity.fk_Character_id1 = id;
        return this;
    }

    public setHolder(holder: Character | CharacterBuilder): ContactBuilder {
        if (holder instanceof CharacterBuilder) holder = <Character>holder.build();
        this._entity.Character_CharacterToContact_fk_Character_id = holder;
        return this;
    }

    public setContact(contact: Character | CharacterBuilder): ContactBuilder {
        if (contact instanceof CharacterBuilder) contact = <Character>contact.build();
        this._entity.Character_CharacterToContact_fk_Character_id1 = contact;
        return this;
    }
}
