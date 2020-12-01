import CharacterSkill from '../entities/CharacterSkill';
import Skill from '../entities/Skill';
import EntityBuilder from '../EntityBuilder';
import CharacterSkillBuilder from './CharacterSkillBuilder';

export default class SkillBuilder extends EntityBuilder {
    protected _entity: Skill;

    public setName(name: string): SkillBuilder {
        this._entity.name = name;
        return this;
    }

    public setHash(hash: string): SkillBuilder {
        this._entity.hash = hash;
        return this;
    }

    public setMaxLevel(maxLevel: number): SkillBuilder {
        this._entity.maxLevel = maxLevel;
        return this;
    }

    public setId(id: number): SkillBuilder {
        this._entity.id = id;
        return this;
    }

    public addCharacterSkill(characterSkill: CharacterSkill | CharacterSkillBuilder): SkillBuilder {
        if (!this._entity.CharacterSkill) this._entity.CharacterSkill = new Array<CharacterSkill>();
        if (characterSkill instanceof CharacterSkillBuilder) characterSkill = <CharacterSkill>characterSkill.build();
        this._entity.CharacterSkill.push(characterSkill);
        return this;
    }
}
