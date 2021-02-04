import { Entity, IEntity } from '../Entity';
import AccountModel from '../models/Account';
import { Builder, IBuilder } from '../../utilities/Builder';
import { EntityValidate } from '../EntityValidate';

interface IAccount extends IEntity {
    compoundId: string;
    providerType: string;
    providerId: string;
    providerAccountId: string;
    refreshToken: string;
    accessToken: string;
    accessTokenExpires: Date;
}

export default class Account extends Entity<typeof AccountModel, AccountModel, IAccount> implements IAccount {
    id: number;
    accessToken: string;
    accessTokenExpires: Date;
    compoundId: string;
    providerAccountId: string;
    providerId: string;
    providerType: string;
    refreshToken: string;

    public constructor(builder?: IBuilder<IAccount>) {
        super(builder);
        this.entityModelConstructor = AccountModel;
    }

    public static Builder(): IBuilder<IAccount> {
        return Builder<IAccount>();
    }

    public static get validate(): EntityValidate {
        return {
            id: { type: 'number' },
            accessToken: { type: 'string' },
            accessTokenExpires: { type: 'object' },
            compoundId: { type: 'string' },
            providerAccountId: { type: 'string' },
            providerId: { type: 'string' },
            providerType: { type: 'string' },
            refreshToken: { type: 'string' },
        };
    }

    public static parse(object: { [key: string]: any }): Account {
        if (typeof object !== 'object') return;

        const account: Account = new Account();

        for (const prop in object) {
            if (!Account.validate[prop]) continue;
            if (typeof object[prop] !== Account.validate[prop].type) continue;
            account[prop] = object[prop];
        }

        return account;
    }
}
