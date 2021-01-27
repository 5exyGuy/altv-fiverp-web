import { Model } from 'objection';
import Character from './Character';
import LoginHistory from './LoginHistory';
import RegistrationRequest from './RegistrationRequest';
import ResetPasswordRequest from './ResetPasswordRequest';
import Session from './Session';
import VerificationRequest from './VerificationRequest';

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
    public role!: string;
    public accounts?: Array<Account>;
    public characters?: Array<Character>;
    public loginHistories?: Array<LoginHistory>;
    public sessions?: Array<Session>;

    public static get tableName(): string {
        return 'users';
    }

    public static get idColumn(): string {
        return 'id';
    }

    public static get relationMappings() {
        return {
            characters: {
                relation: Model.HasManyRelation,
                modelClass: Character,
                join: {
                    from: 'users.id',
                    to: 'characters.user_id',
                },
            },
            loginHistories: {
                relation: Model.HasManyRelation,
                modelClass: LoginHistory,
                join: {
                    from: 'users.id',
                    to: 'login_histories.user_id',
                },
            },
            sessions: {
                relation: Model.HasManyRelation,
                modelClass: Session,
                join: {
                    from: 'users.id',
                    to: 'sessions.user_id',
                },
            },
            registrationRequests: {
                relation: Model.HasManyRelation,
                modelClass: RegistrationRequest,
                join: {
                    from: 'users.id',
                    to: 'registration_requests.user_id',
                },
            },
            resetPasswordRequests: {
                relation: Model.HasManyRelation,
                modelClass: ResetPasswordRequest,
                join: {
                    from: 'users.id',
                    to: 'reset_password_requests.user_id',
                },
            },
            verificationRequest: {
                relation: Model.HasManyRelation,
                modelClass: VerificationRequest,
                join: {
                    from: 'users.id',
                    to: 'verification_requests.user_id',
                },
            },
        };
    }
}
