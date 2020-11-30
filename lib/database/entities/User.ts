import Character from './Character';
import ConfirmationToken from './ConfirmationToken';
import LoginHistory from './LoginHistory';

export default class User {
    public username: string;
    public email: string;
    public password: string;
    public registrationDate: Date;
    public verified: boolean;
    public refreshToken: string;
    public id: number;
    public Character: Array<Character>;
    public ConfirmationToken: Array<ConfirmationToken>;
    public LoginHistory: Array<LoginHistory>;
}
