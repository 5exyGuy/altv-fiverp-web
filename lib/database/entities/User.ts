import Entity from '../Entity';
import Character from './Character';
import LoginHistory from './LoginHistory';

export default class User extends Entity {
    public username: string;
    public email: string;
    public password: string;
    public role: string;
    public registrationDate: Date;
    public verified: boolean;
    public confirmationToken: string;
    public refreshToken: string;
    public id: number;
    public Character: Array<Character>;
    public LoginHistory: Array<LoginHistory>;
}
