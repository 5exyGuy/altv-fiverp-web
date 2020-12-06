import Character from '../entities/Character';
import CharacterSkill from '../entities/CharacterSkill';
import Skill from '../entities/Skill';
import EntityBuilder from '../EntityBuilder';
import CharacterBuilder from './CharacterBuilder';
import SkillBuilder from './SkillBuilder';

export default class CharacterSkillBuilder extends EntityBuilder {
    protected _entity: CharacterSkill = new CharacterSkill();

    public setLevel(level: number): CharacterSkillBuilder {
        this._entity.level = level;
        return this;
    }

    public setXp(xp: number): CharacterSkillBuilder {
        this._entity.xp = xp;
        return this;
    }

    public setId(id: number): CharacterSkillBuilder {
        this._entity.id = id;
        return this;
    }

    public setSkillId(id: number): CharacterSkillBuilder {
        this._entity.fk_Skill_id = id;
        return this;
    }

    public setCharacterId(id: number): CharacterSkillBuilder {
        this._entity.fk_Character_id = id;
        return this;
    }

    public setCharacter(character: Character | CharacterBuilder): CharacterSkillBuilder {
        if (character instanceof CharacterBuilder) character = <Character>character.build();
        this._entity.Character = character;
        return this;
    }

    public setSkill(skill: Skill | SkillBuilder): CharacterSkillBuilder {
        if (skill instanceof SkillBuilder) skill = <Skill>skill.build();
        this._entity.Skill = skill;
        return this;
    }
}
