import ApartmentInventory from './ApartmentInventory';
import CharacterApartment from './CharacterApartment';

export default class Apartment {
    public price: number;
    public lockState: string;
    public location: string;
    public id: number;
    public ApartmentInventory: ApartmentInventory[];
    public CharacterApartment: CharacterApartment[];
}
