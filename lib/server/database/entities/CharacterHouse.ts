import House from './House';
import Character from './Character';
import Entity from '../Entity';

export default class CharacterHouse extends Entity<CharacterHouse> {
    public id: number;
    public fkCharacterId: number;
    public fkHouseId: number;
    public fkCharacter: Character;
    public fkHouse: House;
}
