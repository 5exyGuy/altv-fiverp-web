import { Entity, IEntity } from '../Entity';
import ResetPasswordRequestModel from '../models/ResetPasswordRequest';
import { Builder, IBuilder } from '../../utilities/Builder';

interface IResetPasswordRequest extends IEntity {
    token: string;
    expires: Date;
}

export default class ResetPasswordRequest extends Entity<
    typeof ResetPasswordRequestModel,
    ResetPasswordRequestModel,
    IResetPasswordRequest
> {
    public constructor(builder: IBuilder<IResetPasswordRequest>) {
        super(builder);
        this.entityModelConstructor = ResetPasswordRequestModel;
    }

    public static Builder(): IBuilder<IResetPasswordRequest> {
        return Builder<IResetPasswordRequest>();
    }
}
