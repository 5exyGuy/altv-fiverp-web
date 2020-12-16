import Entity from '../Entity';
import Character from './Character';
import LoginHistory from './LoginHistory';

export default class User extends Entity {
    public name: string;
    public email: string;
    public password: string;
    public emailVerified: Date;
    public emailVerifyToken: string;
    public image: string;
    public role: string;
    public createdAt: Date;
    public updatedAt: Date;
    public id: number;
    public Character: Array<Character>;
    public LoginHistory: Array<LoginHistory>;
}
