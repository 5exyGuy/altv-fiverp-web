import House from './House';
import Character from './Character';
import Entity from '../Entity';

export default class CharacterHouse extends Entity {
    public id: number;
    public fk_Character_id: number;
    public fk_House_id: number;
    public Character: Character;
    public House: House;
}
