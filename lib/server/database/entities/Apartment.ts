import Entity from '../Entity';
import ApartmentInventory from './ApartmentInventory';
import CharacterApartment from './CharacterApartment';

export default class Apartment extends Entity<Apartment> {
    public price: number;
    public locked: boolean;
    public location: string;
    public id: number;
    public apartmentInventories: ApartmentInventory[];
    public characterApartment: CharacterApartment;
}
