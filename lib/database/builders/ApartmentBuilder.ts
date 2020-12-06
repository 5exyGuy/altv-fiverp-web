import Apartment from '../entities/Apartment';
import ApartmentInventory from '../entities/ApartmentInventory';
import CharacterApartment from '../entities/CharacterApartment';
import EntityBuilder from '../EntityBuilder';
import ApartmentInventoryBuilder from './ApartmentInventoryBuilder';
import CharacterApartmentBuilder from './CharacterApartmentBuilder';

export default class ApartmentBuilder extends EntityBuilder {
    protected _entity: Apartment = new Apartment();

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

    public addApartmentInventory(apartmentInventory: ApartmentInventory | ApartmentInventoryBuilder): ApartmentBuilder {
        if (!this._entity.ApartmentInventory) this._entity.ApartmentInventory = new Array<ApartmentInventory>();
        if (apartmentInventory instanceof ApartmentInventoryBuilder)
            apartmentInventory = <ApartmentInventory>apartmentInventory.build();
        this._entity.ApartmentInventory.push(apartmentInventory);
        return this;
    }

    public addCharacterApartment(characterApartment: CharacterApartment | CharacterApartmentBuilder): ApartmentBuilder {
        if (!this._entity.CharacterApartment) this._entity.CharacterApartment = new Array<CharacterApartment>();
        if (characterApartment instanceof CharacterApartmentBuilder)
            characterApartment = <CharacterApartment>characterApartment.build();
        this._entity.CharacterApartment.push(characterApartment);
        return this;
    }
}
