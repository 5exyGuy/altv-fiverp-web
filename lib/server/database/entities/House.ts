import Entity from '../Entity';
import CharacterHouse from './CharacterHouse';
import HouseInventory from './HouseInventory';

export default class House extends Entity<House> {
    public price: number;
    public locked: boolean;
    public location: string;
    public id: number;
    public characterHouse: CharacterHouse;
    public houseInventories: HouseInventory[];
}
