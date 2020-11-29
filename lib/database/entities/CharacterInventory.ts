import Inventory from './Inventory';
import Character from './Character';

export default class CharacterInventory {
    public id: number;
    public fk_Inventory_id: number;
    public fk_Character_id: number;
    public Character: Character;
    public Inventory: Inventory;
}
