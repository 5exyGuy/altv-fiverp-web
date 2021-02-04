import { Entity, IEntity } from '../Entity';
import UserModel from '../models/User';
import { Builder, IBuilder } from '../../utilities/Builder';
import { UserRole } from '../../../shared/enums/UserRole';

interface IUser extends IEntity {
    username: string;
    name: string;
    email: string;
    password: string;
    emailVerified: Date;
    verified: boolean;
    image: string;
    createdAt: Date;
    role: UserRole;
}

export default class User extends Entity<typeof UserModel, UserModel, IUser> {
    public constructor(builder: IBuilder<IUser>) {
        super(builder);
        this.entityModelConstructor = UserModel;
    }

    public static Builder(): IBuilder<IUser> {
        return Builder<IUser>();
    }
}
