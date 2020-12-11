import Entity from '../Entity';
import Character from './Character';
import FactionMember from './FactionMember';

export default class Faction extends Entity {
    public name: string;
    public registrationDate: Date;
    public id: number;
    public fk_Character_id: number;
    public Character: Character;
    public FactionMember: FactionMember[];
}
