import { Entity, IEntity } from '../Entity';
import VerificationRequestModel from '../models/VerificationRequest';
import { Builder, IBuilder } from '../../utilities/Builder';

interface IVerificationRequest extends IEntity {
    token: string;
    expires: Date;
}

export default class VerificationRequest extends Entity<
    typeof VerificationRequestModel,
    VerificationRequestModel,
    IVerificationRequest
> {
    public constructor(builder: IBuilder<IVerificationRequest>) {
        super(builder);
        this.entityModelConstructor = VerificationRequestModel;
    }

    public static Builder(): IBuilder<IVerificationRequest> {
        return Builder<IVerificationRequest>();
    }
}
