import Entity from '../Entity';
import Character from './Character';

export default class Message extends Entity<Message> {
    public content: string;
    public date: Date;
    public id: number;
    public fkCharacterId1: number;
    public fkCharacterId2: number;
    public fkCharacter1: Character;
    public fkCharacter2: Character;
}
