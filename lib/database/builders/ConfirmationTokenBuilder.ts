import ConfirmationToken from '../entities/ConfirmationToken';
import User from '../entities/User';
import EntityBuilder from '../EntityBuilder';
import UserBuilder from './UserBuilder';

export default class ConfirmationTokenBuilder extends EntityBuilder {
    protected _entity: ConfirmationToken;

    public setToken(token: string): ConfirmationTokenBuilder {
        this._entity.token = token;
        return this;
    }

    public setId(id: number): ConfirmationTokenBuilder {
        this._entity.id = id;
        return this;
    }

    public setUserId(id: number): ConfirmationTokenBuilder {
        this._entity.fk_User_id = id;
        return this;
    }

    public setUser(user: User | UserBuilder): ConfirmationTokenBuilder {
        if (user instanceof UserBuilder) user = <User>user.build();
        this._entity.User = user;
        return this;
    }
}
