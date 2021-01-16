import Entity from '../Entity';
import Character from './Character';

export default class Faction extends Entity<Faction> {
    private _name: string;
    private _createdAt: Date;
    private _id: number;
    private _ownerId: number;
    private _owner: Character;
    private _members: Array<Character>;
}
