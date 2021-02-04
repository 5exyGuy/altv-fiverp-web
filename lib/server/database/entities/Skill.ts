import { Entity, IEntity } from '../Entity';
import SkillModel from '../models/Skill';
import { Builder, IBuilder } from '../../utilities/Builder';

interface ISkill extends IEntity {
    name: string;
    hash: string;
    maxLevel: number;
}

export default class Skill extends Entity<typeof SkillModel, SkillModel, ISkill> {
    public constructor(builder: IBuilder<ISkill>) {
        super(builder);
        this.entityModelConstructor = SkillModel;
    }

    public Builder(): IBuilder<ISkill> {
        return Builder<ISkill>();
    }
}
