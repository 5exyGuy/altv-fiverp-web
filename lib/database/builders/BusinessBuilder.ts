import Business from '../entities/Business';
import EntityBuilder from '../EntityBuilder';

export default class BusinessBuilder extends EntityBuilder {
    protected _entity: Business;

    public setPrice(price: number): BusinessBuilder {
        this._entity.price = price;
        return this;
    }

    public setLockState(lockState: string): BusinessBuilder {
        this._entity.lockState = lockState;
        return this;
    }

    public setLocation(location: string): BusinessBuilder {
        this._entity.location = location;
        return this;
    }

    public setId(id: number): BusinessBuilder {
        this._entity.id = id;
        return this;
    }
}
