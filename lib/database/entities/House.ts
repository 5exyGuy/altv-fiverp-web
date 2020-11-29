import CharacterHouse from './CharacterHouse';
import HouseInventory from './HouseInventory';

export default class House {
    public price: number;
    public lockState: string;
    public location: string;
    public id: number;
    public CharacterHouse: CharacterHouse[];
    public HouseInventory: HouseInventory[];
}
