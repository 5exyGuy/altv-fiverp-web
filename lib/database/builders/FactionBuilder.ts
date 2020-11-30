import Character from '../entities/Character';
import Faction from '../entities/Faction';
import EntityBuilder from '../EntityBuilder';
import CharacterBuilder from './CharacterBuilder';

export default class FactionBuilder extends EntityBuilder {
    protected _entity: Faction;

    public setName(name: string): FactionBuilder {
        this._entity.name = name;
        return this;
    }

    public setRegistrationDate(registrationDate: Date): FactionBuilder {
        this._entity.registrationDate = registrationDate;
        return this;
    }

    public setId(id: number): FactionBuilder {
        this._entity.id = id;
        return this;
    }

    public setOwnerId(id: number): FactionBuilder {
        this._entity.fk_Character_id = id;
        return this;
    }

    public setOwner(owner: Character | CharacterBuilder): FactionBuilder {
        if (owner instanceof CharacterBuilder) owner = <Character>owner.build();
        this._entity.Character = owner;
        return this;
    }
}
