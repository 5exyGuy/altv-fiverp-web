class Entity {
    public constructor() {}
}

interface EntityBuilder {
    build(): Entity;
}

class User {
    public username: string;
    public password: string;

    public constructor() {}
}

class UserBuilder implements EntityBuilder {
    private _user: User;

    public constructor() {
        this._user = new User();
    }

    public setUsername(username: string): UserBuilder {
        this._user.username = username;
        return this;
    }

    public setPassword(password: string): UserBuilder {
        this._user.password = password;
        return this;
    }

    public build(): User {
        return this._user;
    }
}

const user: User = new User();
user.username = 'unknown';
user.password = 'pw123';
