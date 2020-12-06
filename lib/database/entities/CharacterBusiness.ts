import Entity from '../Entity';
import Business from './Business';
import Character from './Character';

export default class CharacterBusiness extends Entity {
    id: number;
    fk_Business_id: number;
    fk_Character_id: number;
    Business: Business;
    Character: Character;
}
