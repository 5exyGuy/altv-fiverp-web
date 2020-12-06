import Entity from '../Entity';
import BusinessInventory from './BusinessInventory';
import CharacterBusiness from './CharacterBusiness';

export default class Business extends Entity {
    public price: number;
    public lockState: string;
    public location: string;
    public id: number;
    public BusinessInventory: BusinessInventory[];
    public CharacterBusiness: CharacterBusiness[];
}
