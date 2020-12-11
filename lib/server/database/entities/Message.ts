import Entity from '../Entity';
import Character from './Character';

export default class Message extends Entity {
    public content: string;
    public date: Date;
    public id: number;
    public fk_Character_id: number;
    public fk_Character_id1: number;
    public Character_CharacterToMessage_fk_Character_id: Character;
    public Character_CharacterToMessage_fk_Character_id1: Character;
}
