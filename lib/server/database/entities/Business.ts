import Entity from '../Entity';
import Character from './Character';
import Inventory from './Inventory';

export default class Business extends Entity<Business> {
    private price: number;
    private locked: boolean;
    private location: string;
    private id: number;
    private inventories: Inventory[];
    private owner: Character;
}
