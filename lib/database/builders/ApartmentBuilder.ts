import Apartment from '../entities/Apartment';
import EntityBuilder from '../EntityBuilder';

export default class ApartmentBuilder extends EntityBuilder {
    protected _entity: Apartment;

    public setPrice(price: number): ApartmentBuilder {
        this._entity.price = price;
        return this;
    }

    public setLockState(lockState: string): ApartmentBuilder {
        this._entity.lockState = lockState;
        return this;
    }

    public setLocation(location: string): ApartmentBuilder {
        this._entity.location = location;
        return this;
    }

    public setId(id: number): ApartmentBuilder {
        this._entity.id = id;
        return this;
    }
}
