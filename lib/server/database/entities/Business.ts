import Entity from '../Entity';
import BusinessInventory from './BusinessInventory';
import CharacterBusiness from './CharacterBusiness';

export default class Business extends Entity<Business> {
    public price: number;
    public locked: boolean;
    public location: string;
    public id: number;
    public businessInventories: BusinessInventory[];
    public characterBusiness: CharacterBusiness;
}
