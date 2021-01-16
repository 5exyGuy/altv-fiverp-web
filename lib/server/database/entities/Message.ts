import Entity from '../Entity';
import Character from './Character';

export default class Message extends Entity<Message> {
    private _content: string;
    private _date: Date;
    private _id: number;
    private _fkCharacterId1: number;
    private _fkCharacterId2: number;
    private _fkCharacter1: Character;
    private _fkCharacter2: Character;
}
