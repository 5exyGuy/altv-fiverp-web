import House from '../entities/House';
import EntityBuilder from '../EntityBuilder';

export default class HouseBuilder extends EntityBuilder {
    protected _entity: House;

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
}
