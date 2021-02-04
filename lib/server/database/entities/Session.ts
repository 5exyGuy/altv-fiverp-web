import { Entity, IEntity } from '../Entity';
import SessionModel from '../models/Session';
import { Builder, IBuilder } from '../../utilities/Builder';

interface ISession extends IEntity {
    expires: Date;
    sessionToken: string;
    accessToken: string;
}

export default class Session extends Entity<typeof SessionModel, SessionModel, ISession> {
    public constructor(builder: IBuilder<ISession>) {
        super(builder);
        this.entityModelConstructor = SessionModel;
    }

    public static Builder(): IBuilder<ISession> {
        return Builder<ISession>();
    }
}
