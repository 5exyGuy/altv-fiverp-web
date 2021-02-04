import { Entity, IEntity } from '../Entity';
import ContactModel from '../models/Contact';
import { Builder, IBuilder } from '../../utilities/Builder';

type IContact = IEntity;

export default class Contact extends Entity<typeof ContactModel, ContactModel, IContact> {
    public constructor(builder: IBuilder<IContact>) {
        super(builder);
        this.entityModelConstructor = ContactModel;
    }

    public static Builder(): IBuilder<IContact> {
        return Builder<IContact>();
    }
}
