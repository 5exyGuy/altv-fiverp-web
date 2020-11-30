import House from './House';
import Character from './Character';

export default class CharacterHouse {
    public id: number;
    public fk_Character_id: number;
    public fk_House_id: number;
    public Character: Character;
    public House: House;
}
