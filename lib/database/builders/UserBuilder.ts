import User from '../entities/User';
import EntityBuilder from '../EntityBuilder';
import LoginHistory from '../entities/LoginHistory';
import Character from '../entities/Character';
import LoginHistoryBuilder from './LoginHistoryBuilder';
import CharacterBuilder from './CharacterBuilder';

export default class UserBuilder extends EntityBuilder {
    protected _entity: User = new User();

    public setUsername(username: string): UserBuilder {
        this._entity.username = username;
        return this;
    }

    public setEmail(email: string): UserBuilder {
        this._entity.email = email;
        return this;
    }

    public setPassword(password: string): UserBuilder {
        this._entity.password = password;
        return this;
    }

    public setRegistrationDate(registrationDate: Date): UserBuilder {
        this._entity.registrationDate = registrationDate;
        return this;
    }

    public setId(id: number): UserBuilder {
        this._entity.id = id;
        return this;
    }

    public addLoginHistory(loginHistory: LoginHistory | LoginHistoryBuilder): UserBuilder {
        if (!this._entity.LoginHistory) this._entity.LoginHistory = new Array<LoginHistory>();
        if (loginHistory instanceof LoginHistoryBuilder) loginHistory = <LoginHistory>loginHistory.build();
        this._entity.LoginHistory.push(loginHistory);
        return this;
    }

    public addCharacter(character: Character | CharacterBuilder): UserBuilder {
        if (!this._entity.Character) this._entity.Character = new Array<Character>();
        if (character instanceof CharacterBuilder) character = <Character>character.build();
        this._entity.Character.push(character);
        return this;
    }
}
