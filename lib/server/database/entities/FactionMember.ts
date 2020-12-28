import Entity from '../Entity';
import Character from './Character';
import Faction from './Faction';

export default class FactionMember extends Entity<FactionMember> {
    public joinedAt: Date;
    public id: number;
    public fkCharacterId: number;
    public fkFactionId: number;
    public fkCharacter: Character;
    public fkFaction: Faction;
}
