import Inventory from './Inventory';
import Character from './Character';
import Entity from '../Entity';

export default class CharacterInventory extends Entity {
    public id: number;
    public fk_Inventory_id: number;
    public fk_Character_id: number;
    public Character: Character;
    public Inventory: Inventory;
}
