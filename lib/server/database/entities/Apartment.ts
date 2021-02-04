import { Entity, IEntity } from '../Entity';
import ApartmentModel from '../models/Apartment';
import { Builder, IBuilder } from '../../utilities/Builder';
import { EntityValidate } from '../EntityValidate';

interface IApartment extends IEntity {
    price: number;
    locked: boolean;
    location: string;
}

export default class Apartment extends Entity<typeof ApartmentModel, ApartmentModel, IApartment> {
    public constructor(builder?: IBuilder<IApartment>) {
        super(builder);
        this.entityModelConstructor = ApartmentModel;
    }

    public static Builder(): IBuilder<IApartment> {
        return Builder<IApartment>();
    }

    public static get validate(): EntityValidate {
        return {
            id: { type: 'number' },
            price: { type: 'number' },
            locked: { type: 'boolean' },
            location: { type: 'string' },
        };
    }

    public static parse(object: { [key: string]: any }): Apartment {
        if (typeof object !== 'object') return;

        const apartment: Apartment = new Apartment();

        for (const prop in object) {
            if (!Apartment.validate[prop]) continue;
            if (typeof object[prop] !== Apartment.validate[prop].type) continue;
            apartment[prop] = object[prop];
        }

        return apartment;
    }
}
