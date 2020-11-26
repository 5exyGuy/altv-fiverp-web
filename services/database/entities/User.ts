import UserBuilder from '../builders/UserBuilder';
import Entity from '../Entity';
import Character from './Character';
import LoginHistory from './LoginHistory';

export default class User extends Entity {
    public id: number;
    public username: string;
    public email: string;
    public password: string;
    public registrationDate: Date;
    public characters: Array<Character>;
    public loginHistories: Array<LoginHistory>;

    public constructor() {
        super();
    }

    public static get Builder(): typeof UserBuilder {
        return UserBuilder;
    }
}
