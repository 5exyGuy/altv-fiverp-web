import Apartment from './Apartment';
import Character from './Character';

export default class CharacterApartment {
    public id: number;
    public fk_Character_id: number;
    public fk_Apartment_id: number;
    public Apartment: Apartment;
    public Character: Character;
}
