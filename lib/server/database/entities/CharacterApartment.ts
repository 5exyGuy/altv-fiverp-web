import Entity from '../Entity';
import Apartment from './Apartment';
import Character from './Character';

export default class CharacterApartment extends Entity<CharacterApartment> {
    public id: number;
    public fkCharacterId: number;
    public fkApartmentId: number;
    public fkCharacter: Character;
    public fkApartment: Apartment;
}
