import ExtendedModel from '../ExtendedModel';
import Character from './Character';
import LoginHistory from './LoginHistory';
import RegistrationRequest from './RegistrationRequest';
import ResetPasswordRequest from './ResetPasswordRequest';
import Session from './Session';
import VerificationRequest from './VerificationRequest';

// type UserFields = {
//     id?: number;
//     username?: string;
//     name?: string;
//     email?: string;
//     password?: string;
//     emailVerified?: Date;
//     verified?: boolean;
//     image?: string;
//     createdAt?: Date;
//     role?: string;
//     accounts?: Array<Account>;
//     characters?: Array<Character>;
//     loginHistories?: Array<LoginHistory>;
//     sessions?: Array<Session>;
// };

export default class User extends ExtendedModel<User> {
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
    public verificationRequests?: Array<VerificationRequest>;
    public registrationRequests?: Array<RegistrationRequest>;
    public resetPasswordRequests?: Array<ResetPasswordRequest>;

    // public setUsername(value: string): User {
    //     this.setUpdateField('username', value);
    //     return this;
    // }

    // public setName(value: string): User {
    //     this.setUpdateField('name', value);
    //     return this;
    // }

    // public setEmail(value: string): User {
    //     this.setUpdateField('email', value);
    //     return this;
    // }

    // public setPassword(value: string): User {
    //     this.setUpdateField('password', value);
    //     return this;
    // }

    // public setEmailVerified(value: Date): User {
    //     this.setUpdateField('emailVerified', value);
    //     return this;
    // }

    // public setVerified(value: boolean): User {
    //     this.setUpdateField('verified', value);
    //     return this;
    // }

    // public setImage(value: string): User {
    //     this.setUpdateField('image', value);
    //     return this;
    // }

    // public setCreatedAt(value: Date): User {
    //     this.setUpdateField('createdAt', value);
    //     return this;
    // }

    // public setRole(value: string): User {
    //     this.setUpdateField('role', value);
    //     return this;
    // }

    // public async save(): Promise<User> {
    //     const fields: UserFields = this.convertToObject();
    //     return await this.$query().insert(fields);
    // }

    // public async update(): Promise<void> {
    //     if (this._updateFields.size <= 0) return;
    //     try {
    //         const fields: UserFields = this.convertUpdateFieldsToObject();
    //         await this.$query().findById(this.id).patch(fields);
    //         this.updateLocalFields();
    //     } catch (error) {
    //         // TODO: Add debug
    //     }
    // }

    // public async delete(): Promise<void> {}

    // public static async getAll(): Promise<Array<User>> {
    //     return await User.query();
    // }

    public static get tableName(): string {
        return 'users';
    }

    public static get idColumn(): string {
        return 'id';
    }

    public static get relationMappings() {
        return {
            characters: {
                relation: ExtendedModel.HasManyRelation,
                modelClass: Character,
                join: {
                    from: 'users.id',
                    to: 'characters.userId',
                },
            },
            loginHistories: {
                relation: ExtendedModel.HasManyRelation,
                modelClass: LoginHistory,
                join: {
                    from: 'users.id',
                    to: 'login_histories.userId',
                },
            },
            sessions: {
                relation: ExtendedModel.HasManyRelation,
                modelClass: Session,
                join: {
                    from: 'users.id',
                    to: 'sessions.userId',
                },
            },
            registrationRequests: {
                relation: ExtendedModel.HasManyRelation,
                modelClass: RegistrationRequest,
                join: {
                    from: 'users.id',
                    to: 'registration_requests.userId',
                },
            },
            resetPasswordRequests: {
                relation: ExtendedModel.HasManyRelation,
                modelClass: ResetPasswordRequest,
                join: {
                    from: 'users.id',
                    to: 'reset_password_requests.userId',
                },
            },
            verificationRequest: {
                relation: ExtendedModel.HasManyRelation,
                modelClass: VerificationRequest,
                join: {
                    from: 'users.id',
                    to: 'verification_requests.userId',
                },
            },
        };
    }
}
