import { Entity, IEntity } from '../Entity';
import MessageModel from '../models/Message';
import { Builder, IBuilder } from '../../utilities/Builder';

interface IMessage extends IEntity {
    content: string;
    date: Date;
}

export default class Message extends Entity<typeof MessageModel, MessageModel, IMessage> {
    public constructor(builder: IBuilder<IMessage>) {
        super(builder);
        this.entityModelConstructor = MessageModel;
    }

    public static Builder(): IBuilder<IMessage> {
        return Builder<IMessage>();
    }
}
