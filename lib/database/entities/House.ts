import Entity from '../Entity';
import CharacterHouse from './CharacterHouse';
import HouseInventory from './HouseInventory';

export default class House extends Entity {
    public price: number;
    public lockState: string;
    public location: string;
    public id: number;
    public CharacterHouse: CharacterHouse[];
    public HouseInventory: HouseInventory[];
}
