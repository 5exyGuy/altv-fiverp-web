import Character from '../entities/Character';
import Faction from '../entities/Faction';
import FactionMember from '../entities/FactionMember';
import EntityBuilder from '../EntityBuilder';
import CharacterBuilder from './CharacterBuilder';
import FactionBuilder from './FactionBuilder';

export default class FactionMemberBuilder extends EntityBuilder {
    protected _entity: FactionMember;

    public setJoinDate(joinDate: Date): FactionMemberBuilder {
        this._entity.joinDate = joinDate;
        return this;
    }

    public setId(id: number): FactionMemberBuilder {
        this._entity.id = id;
        return this;
    }

    public setCharacterId(id: number): FactionMemberBuilder {
        this._entity.fk_Character_id = id;
        return this;
    }

    public setFactionId(id: number): FactionMemberBuilder {
        this._entity.fk_Faction_id = id;
        return this;
    }

    public setCharacter(character: Character | CharacterBuilder): FactionMemberBuilder {
        if (character instanceof CharacterBuilder) character = <Character>character.build();
        this._entity.Character = character;
        return this;
    }

    public setFaction(faction: Faction | FactionBuilder): FactionMemberBuilder {
        if (faction instanceof FactionBuilder) faction = <Faction>faction.build();
        this._entity.Faction = faction;
        return this;
    }
}
