import Character from './Character';
import LoginHistory from './LoginHistory';
import RegistrationRequest from './RegistrationRequest';
import ResetPasswordRequest from './ResetPasswordRequest';
import Session from './Session';
import VerificationRequest from './VerificationRequest';
import Account from './Account';
import { Model, RelationMappings } from 'objection';
import { UserRole } from '../../../shared/enums/UserRole';

export default class User extends Model {
    public id!: number;
    public username!: string;
    public name?: string;
    public email!: string;
    public password!: string;
    public emailVerified?: Date;
    public verified!: boolean;
    public image?: string;
    public createdAt!: Date;
    public role!: UserRole;
    public accounts?: Array<Account>;
    public characters?: Array<Character>;
    public loginHistories?: Array<LoginHistory>;
    public sessions?: Array<Session>;
    public verificationRequests?: Array<VerificationRequest>;
    public registrationRequests?: Array<RegistrationRequest>;
    public resetPasswordRequests?: Array<ResetPasswordRequest>;

    public static get tableName(): string {
        return 'users';
    }

    public static get idColumn(): string {
        return 'id';
    }

    public static relationMappings(): RelationMappings {
        return {
            accounts: {
                relation: Model.HasManyRelation,
                modelClass: Account,
                join: {
                    from: 'users.id',
                    to: 'accounts.userId',
                },
            },
            characters: {
                relation: Model.HasManyRelation,
                modelClass: Character,
                join: {
                    from: 'users.id',
                    to: 'characters.userId',
                },
            },
            loginHistories: {
                relation: Model.HasManyRelation,
                modelClass: LoginHistory,
                join: {
                    from: 'users.id',
                    to: 'login_histories.userId',
                },
            },
            sessions: {
                relation: Model.HasManyRelation,
                modelClass: Session,
                join: {
                    from: 'users.id',
                    to: 'sessions.userId',
                },
            },
            registrationRequests: {
                relation: Model.HasManyRelation,
                modelClass: RegistrationRequest,
                join: {
                    from: 'users.id',
                    to: 'registration_requests.userId',
                },
            },
            resetPasswordRequests: {
                relation: Model.HasManyRelation,
                modelClass: ResetPasswordRequest,
                join: {
                    from: 'users.id',
                    to: 'reset_password_requests.userId',
                },
            },
            verificationRequest: {
                relation: Model.HasManyRelation,
                modelClass: VerificationRequest,
                join: {
                    from: 'users.id',
                    to: 'verification_requests.userId',
                },
            },
        };
    }
}
