import Entity from '../Entity';
import Character from './Character';
import LoginHistory from './LoginHistory';
import Session from './Session';

export default class User extends Entity<User> {
    public username: string;
    public name: string;
    public email: string;
    public password: string;
    public emailVerified: Date;
    public verified: boolean;
    public image: string;
    public createdAt: Date;
    public updatedAt: Date;
    public role: string;
    public id: number;
    public accounts: Account[];
    public characters: Character[];
    public loginHistories: LoginHistory[];
    public sessions: Session[];
}
