import Character from './Character';
import Faction from './Faction';

export default class FactionMember {
    public joinDate: Date;
    public id: number;
    public fk_Character_id: number;
    public fk_Faction_id: number;
    public Character: Character;
    public Faction: Faction;
}
