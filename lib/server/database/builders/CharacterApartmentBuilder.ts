import Apartment from '../entities/Apartment';
import Character from '../entities/Character';
import CharacterApartment from '../entities/CharacterApartment';
import EntityBuilder from '../EntityBuilder';
import ApartmentBuilder from './ApartmentBuilder';
import CharacterBuilder from './CharacterBuilder';

export default class CharacterApartmentBuilder extends EntityBuilder {
    protected _entity: CharacterApartment = new CharacterApartment();

    public setId(id: number): CharacterApartmentBuilder {
        this._entity.id = id;
        return this;
    }

    public setCharacterId(id: number): CharacterApartmentBuilder {
        this._entity.fk_Character_id = id;
        return this;
    }

    public setApartmentId(id: number): CharacterApartmentBuilder {
        this._entity.fk_Apartment_id = id;
        return this;
    }

    public setApartment(apartment: Apartment | ApartmentBuilder): CharacterApartmentBuilder {
        if (apartment instanceof ApartmentBuilder) apartment = <Apartment>apartment.build();
        this._entity.Apartment = apartment;
        return this;
    }

    public setCharacter(character: Character | CharacterBuilder): CharacterApartmentBuilder {
        if (character instanceof CharacterBuilder) character = <Character>character.build();
        this._entity.Character = character;
        return this;
    }
}
