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

    public setName(name: string): UserBuilder {
        this._entity.name = name;
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

    public setPasswordVerifyToken(passwordVerifyToken: string): UserBuilder {
        this._entity.passwordVerifyToken = passwordVerifyToken;
        return this;
    }

    public setEmailVerified(emailVerified: Date): UserBuilder {
        this._entity.emailVerified = emailVerified;
        return this;
    }

    public setEmailVerifyToken(emailVerifyToken: string): UserBuilder {
        this._entity.emailVerifyToken = emailVerifyToken;
        return this;
    }

    public setVerified(verified: boolean): UserBuilder {
        this._entity.verified = verified;
        return this;
    }

    public setImage(image: string): UserBuilder {
        this._entity.image = image;
        return this;
    }

    public setRole(role: string): UserBuilder {
        this._entity.role = role;
        return this;
    }

    public setCreatedAt(createdAt: Date): UserBuilder {
        this._entity.createdAt = createdAt;
        return this;
    }

    public setUpdatedAt(updatedAt: Date): UserBuilder {
        this._entity.updatedAt = updatedAt;
        return this;
    }

    public setId(id: number): UserBuilder {
        this._entity.id = id;
        return this;
    }

    public addCharacter(character: Character | CharacterBuilder): UserBuilder {
        if (!this._entity.Character) this._entity.Character = new Array<Character>();
        if (character instanceof CharacterBuilder) character = <Character>character.build();
        this._entity.Character.push(character);
        return this;
    }

    public addLoginHistory(loginHistory: LoginHistory | LoginHistoryBuilder): UserBuilder {
        if (!this._entity.LoginHistory) this._entity.LoginHistory = new Array<LoginHistory>();
        if (loginHistory instanceof LoginHistoryBuilder) loginHistory = <LoginHistory>loginHistory.build();
        this._entity.LoginHistory.push(loginHistory);
        return this;
    }

    public build(): User {
        return this._entity;
    }
}
