import { Entity, IEntity } from '../Entity';
import RegistrationRequestModel from '../models/RegistrationRequest';
import { Builder, IBuilder } from '../../utilities/Builder';

interface IRegistrationRequest extends IEntity {
    token: string;
    expires: Date;
}

export default class RegistrationRequest extends Entity<
    typeof RegistrationRequestModel,
    RegistrationRequestModel,
    IRegistrationRequest
> {
    public constructor(builder: IBuilder<IRegistrationRequest>) {
        super(builder);
        this.entityModelConstructor = RegistrationRequestModel;
    }

    public static Builder(): IBuilder<IRegistrationRequest> {
        return Builder<IRegistrationRequest>();
    }
}
