import Business from '../entities/Business';
import BusinessInventory from '../entities/BusinessInventory';
import CharacterBusiness from '../entities/CharacterBusiness';
import EntityBuilder from '../EntityBuilder';
import BusinessInventoryBuilder from './BusinessInventoryBuilder';
import CharacterBusinessBuilder from './CharacterBusinessBuilder';

export default class BusinessBuilder extends EntityBuilder {
    protected _entity: Business = new Business();

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

    public addBusinessInventory(businessInventory: BusinessInventory | BusinessInventoryBuilder): BusinessBuilder {
        if (!this._entity.BusinessInventory) this._entity.BusinessInventory = new Array<BusinessInventory>();
        if (businessInventory instanceof BusinessInventoryBuilder)
            businessInventory = <BusinessInventory>businessInventory.build();
        this._entity.BusinessInventory.push(businessInventory);
        return this;
    }

    public addCharacterBusiness(characterBusiness: CharacterBusiness | CharacterBusinessBuilder): BusinessBuilder {
        if (!this._entity.CharacterBusiness) this._entity.CharacterBusiness = new Array<CharacterBusiness>();
        if (characterBusiness instanceof CharacterBusinessBuilder)
            characterBusiness = <CharacterBusiness>characterBusiness.build();
        this._entity.CharacterBusiness.push(characterBusiness);
        return this;
    }
}
