import { Entity, IEntity } from '../Entity';
import BusinessModel from '../models/Business';
import { Builder, IBuilder } from '../../utilities/Builder';
import { EntityValidate } from '../EntityValidate';

interface IBusiness extends IEntity {
    price: number;
    locked: boolean;
    location: string;
}

export default class Business extends Entity<typeof BusinessModel, BusinessModel, IBusiness> {
    public constructor(builder?: IBuilder<IBusiness>) {
        super(builder);
        this.entityModelConstructor = BusinessModel;
    }

    public static Builder(): IBuilder<IBusiness> {
        return Builder<IBusiness>();
    }

    public static get validate(): EntityValidate {
        return {
            id: { type: 'number' },
            price: { type: 'number' },
            locked: { type: 'boolean' },
            location: { type: 'string' },
        };
    }

    public static parse(object: { [key: string]: any }): Business {
        if (typeof object !== 'object') return;

        const business: Business = new Business();

        for (const prop in object) {
            if (!Business.validate[prop]) continue;
            if (typeof object[prop] !== Business.validate[prop].type) continue;
            business[prop] = object[prop];
        }

        return business;
    }
}
