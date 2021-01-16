import Entity from '../Entity';
import Character from './Character';
import Inventory from './Inventory';

export default class House extends Entity<House> {
    private _price: number;
    private _locked: boolean;
    private _location: string;
    private _id: number;
    private _owner: Character;
    private _inventories: Array<Inventory>;
}
