import { Entity, IEntity } from '../Entity';
import CharacterModel from '../models/Character';
import { Builder, IBuilder } from '../../utilities/Builder';
import { EntityValidate } from '../EntityValidate';

interface ICharacter extends IEntity {
    firstName?: string;
    lastName?: string;
    cash?: number;
    bank?: number;
    dead?: boolean;
    phoneNumber?: string;
    health?: number;
    armor?: number;
    arrestTime?: number;
    dimension?: number;
    lastPosition?: string;
    lastRotation?: string;
}

export default class Character extends Entity<typeof CharacterModel, CharacterModel, ICharacter> {
    public constructor(builder?: IBuilder<ICharacter>) {
        super(builder);
        this.entityModelConstructor = CharacterModel;
    }

    public toJson(): ICharacter {
        const jsonObject: ICharacter = {};

        for (const prop in Character.validate) {
            if (typeof this[prop] !== Character.validate[prop].type) continue;
            jsonObject[prop] = this[prop];
        }

        return jsonObject;
    }

    public static Builder(): IBuilder<ICharacter> {
        return Builder<ICharacter>();
    }

    public static get validate(): EntityValidate {
        return {
            id: { type: 'number' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            cash: { type: 'number' },
            bank: { type: 'number' },
            dead: { type: 'number' },
            phoneNumber: { type: 'string' },
            health: { type: 'number' },
            armor: { type: 'number' },
            arrestTime: { type: 'number' },
            dimension: { type: 'number' },
            lastPosition: { type: 'string' },
            lastRotation: { type: 'string' },
        };
    }

    public static parse(object: { [key: string]: any }): Character {
        if (typeof object !== 'object') return;

        let builder: IBuilder<ICharacter> = this.Builder();

        for (const prop in object) {
            if (!Character.validate[prop]) continue;
            if (typeof object[prop] !== Character.validate[prop].type) continue;
            builder = builder[prop](object[prop]);
        }

        return new Character(builder);
    }
}
