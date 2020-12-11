import Entity from '../Entity';
import ApartmentInventory from './ApartmentInventory';
import CharacterApartment from './CharacterApartment';

export default class Apartment extends Entity {
    public price: number;
    public lockState: string;
    public location: string;
    public id: number;
    public ApartmentInventory: ApartmentInventory[];
    public CharacterApartment: CharacterApartment[];
}
