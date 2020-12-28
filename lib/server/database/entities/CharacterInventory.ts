import Inventory from './Inventory';
import Character from './Character';
import Entity from '../Entity';

export default class CharacterInventory extends Entity<CharacterInventory> {
    public id: number;
    public fkInventoryId: number;
    public fkCharacterId: number;
    public fkInventory: Inventory;
    public fkCharacter: Character;
}
