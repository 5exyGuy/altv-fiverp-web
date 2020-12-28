import Entity from '../Entity';
import Business from './Business';
import Character from './Character';

export default class CharacterBusiness extends Entity<CharacterBusiness> {
    id: number;
    fkCharacterId: number;
    fkBusinessId: number;
    fkCharacter: Character;
    fkBusiness: Business;
}
