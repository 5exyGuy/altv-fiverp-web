import Entity from '../Entity';
import Character from './Character';

export default class Contact extends Entity<Contact> {
    private _id: number;
    private _fkCharacterId1: number;
    private _fkCharacterId2: number;
    private _fkCharacter1: Character;
    private _fkCharacter2: Character;
}
