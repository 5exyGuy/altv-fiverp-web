import CharacterHouse from '../entities/CharacterHouse';
import House from '../entities/House';
import HouseInventory from '../entities/HouseInventory';
import EntityBuilder from '../EntityBuilder';
import CharacterHouseBuilder from './CharacterHouseBuilder';
import HouseInventoryBuilder from './HouseInventoryBuilder';

export default class HouseBuilder extends EntityBuilder {
    protected _entity: House = new House();

    public setPrice(price: number): HouseBuilder {
        this._entity.price = price;
        return this;
    }

    public setLockState(lockState: string): HouseBuilder {
        this._entity.lockState = lockState;
        return this;
    }

    public setLocation(location: string): HouseBuilder {
        this._entity.location = location;
        return this;
    }

    public setId(id: number): HouseBuilder {
        this._entity.id = id;
        return this;
    }

    public addCharacterHouse(characterHouse: CharacterHouse | CharacterHouseBuilder): HouseBuilder {
        if (!this._entity.CharacterHouse) this._entity.CharacterHouse = new Array<CharacterHouse>();
        if (characterHouse instanceof CharacterHouseBuilder) characterHouse = <CharacterHouse>characterHouse.build();
        this._entity.CharacterHouse.push(characterHouse);
        return this;
    }

    public addHouseInventory(houseInventory: HouseInventory | HouseInventoryBuilder): HouseBuilder {
        if (!this._entity.HouseInventory) this._entity.HouseInventory = new Array<HouseInventory>();
        if (houseInventory instanceof HouseInventoryBuilder) houseInventory = <HouseInventory>houseInventory.build();
        this._entity.HouseInventory.push(houseInventory);
        return this;
    }
}
