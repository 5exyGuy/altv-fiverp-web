import Entity from '../Entity';
import Character from './Character';
import FactionMember from './FactionMember';

export default class Faction extends Entity<Faction> {
    public name: string;
    public createdAt: Date;
    public id: number;
    public fkCharacterId: number;
    public fkCharacter: Character;
    public factionMembers: FactionMember[];
}
