import Business from '../entities/Business';
import Character from '../entities/Character';
import CharacterBusiness from '../entities/CharacterBusiness';
import EntityBuilder from '../EntityBuilder';
import BusinessBuilder from './BusinessBuilder';
import CharacterBuilder from './CharacterBuilder';

export default class CharacterBusinessBuilder extends EntityBuilder {
    protected _entity: CharacterBusiness = new CharacterBusiness();

    public setId(id: number): CharacterBusinessBuilder {
        this._entity.id = id;
        return this;
    }

    public setBusinessId(id: number): CharacterBusinessBuilder {
        this._entity.fk_Business_id = id;
        return this;
    }

    public setCharacterId(id: number): CharacterBusinessBuilder {
        this._entity.fk_Character_id = id;
        return this;
    }

    public setBusiness(business: Business | BusinessBuilder): CharacterBusinessBuilder {
        if (business instanceof BusinessBuilder) business = <Business>business.build();
        this._entity.Business = business;
        return this;
    }

    public setCharacter(character: Character | CharacterBuilder): CharacterBusinessBuilder {
        if (character instanceof CharacterBuilder) character = <Character>character.build();
        this._entity.Character = character;
        return this;
    }
}
