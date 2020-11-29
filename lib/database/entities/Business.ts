import BusinessInventory from './BusinessInventory';
import CharacterBusiness from './CharacterBusiness';

export default class Business {
    public price: number;
    public lockState: string;
    public location: string;
    public id: number;
    public BusinessInventory: BusinessInventory[];
    public CharacterBusiness: CharacterBusiness[];
}
