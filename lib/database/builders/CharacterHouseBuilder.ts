import Character from '../entities/Character';
import CharacterHouse from '../entities/CharacterHouse';
import House from '../entities/House';
import EntityBuilder from '../EntityBuilder';
import CharacterBuilder from './CharacterBuilder';
import HouseBuilder from './HouseBuilder';

export default class CharacterHouseBuilder extends EntityBuilder {
    protected _entity: CharacterHouse;

    public setId(id: number): CharacterHouseBuilder {
        this._entity.id = id;
        return this;
    }

    public setCharacterId(id: number): CharacterHouseBuilder {
        this._entity.fk_Character_id = id;
        return this;
    }

    public setHouseId(id: number): CharacterHouseBuilder {
        this._entity.fk_House_id = id;
        return this;
    }

    public setCharacter(character: Character | CharacterBuilder): CharacterHouseBuilder {
        if (character instanceof CharacterBuilder) character = <Character>character.build();
        this._entity.Character = character;
        return this;
    }

    public setInventory(house: House | HouseBuilder): CharacterHouseBuilder {
        if (house instanceof HouseBuilder) house = <House>house.build();
        this._entity.House = house;
        return this;
    }
}
