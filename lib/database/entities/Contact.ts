import Entity from '../Entity';
import Character from './Character';

export default class Contact extends Entity {
    public id: number;
    public fk_Character_id: number;
    public fk_Character_id1: number;
    public Character_CharacterToContact_fk_Character_id: Character;
    public Character_CharacterToContact_fk_Character_id1: Character;
}
