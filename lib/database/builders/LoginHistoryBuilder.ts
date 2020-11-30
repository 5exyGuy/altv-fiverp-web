import LoginHistory from '../entities/LoginHistory';
import User from '../entities/User';
import EntityBuilder from '../EntityBuilder';
import UserBuilder from './UserBuilder';

export default class LoginHistoryBuilder extends EntityBuilder {
    protected _entity: LoginHistory;

    public setDate(date: Date): LoginHistoryBuilder {
        this._entity.date = date;
        return this;
    }

    public setSocialId(socialId: string): LoginHistoryBuilder {
        this._entity.socialId = socialId;
        return this;
    }

    public setHwidExHash(hwidExHash: Buffer): LoginHistoryBuilder {
        this._entity.hwidExHash = hwidExHash;
        return this;
    }

    public setHwidHash(hwidHash: Buffer): LoginHistoryBuilder {
        this._entity.hwidHash = hwidHash;
        return this;
    }

    public setId(id: number): LoginHistoryBuilder {
        this._entity.id = id;
        return this;
    }

    public setUserId(id: number): LoginHistoryBuilder {
        this._entity.fk_User_id = id;
        return this;
    }

    public setUser(user: User | UserBuilder): LoginHistoryBuilder {
        if (user instanceof UserBuilder) user = <User>user.build();
        this._entity.User = user;
        return this;
    }
}
