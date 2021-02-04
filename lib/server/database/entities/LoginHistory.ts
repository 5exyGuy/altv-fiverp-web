import { Entity, IEntity } from '../Entity';
import LoginHistoryModel from '../models/LoginHistory';
import { Builder, IBuilder } from '../../utilities/Builder';

interface ILoginHistory extends IEntity {
    date: Date;
    ip: string;
    socialId: string;
    hwidExHash: string;
    hwidHash: string;
}

export default class LoginHistory extends Entity<typeof LoginHistoryModel, LoginHistoryModel, ILoginHistory> {
    public constructor(builder: IBuilder<ILoginHistory>) {
        super(builder);
        this.entityModelConstructor = LoginHistoryModel;
    }

    public static Builder(): IBuilder<ILoginHistory> {
        return Builder<ILoginHistory>();
    }
}
