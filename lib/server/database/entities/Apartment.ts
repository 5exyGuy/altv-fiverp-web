import Entity from '../Entity';
import Character from './Character';
import Inventory from './Inventory';

export default class Apartment extends Entity<Apartment> {
    private _price: number;
    private _locked: boolean;
    private _location: string;
    private _id: number;
    private _inventories: Array<Inventory>;
    private _owner: Character;
}
