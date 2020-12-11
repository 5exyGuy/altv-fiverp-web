import Character from '../entities/Character';
import Message from '../entities/Message';
import EntityBuilder from '../EntityBuilder';
import CharacterBuilder from './CharacterBuilder';

export default class MessageBuilder extends EntityBuilder {
    protected _entity: Message = new Message();

    public setContent(content: string): MessageBuilder {
        this._entity.content = content;
        return this;
    }

    public setDate(date: Date): MessageBuilder {
        this._entity.date = date;
        return this;
    }

    public setId(id: number): MessageBuilder {
        this._entity.id = id;
        return this;
    }

    public setSenderId(id: number): MessageBuilder {
        this._entity.fk_Character_id = id;
        return this;
    }

    public setReceiverId(id: number): MessageBuilder {
        this._entity.fk_Character_id1 = id;
        return this;
    }

    public setSender(sender: Character | CharacterBuilder) {
        if (sender instanceof CharacterBuilder) sender = <Character>sender.build();
        this._entity.Character_CharacterToMessage_fk_Character_id = sender;
        return this;
    }

    public setReceiver(receiver: Character | CharacterBuilder) {
        if (receiver instanceof CharacterBuilder) receiver = <Character>receiver.build();
        this._entity.Character_CharacterToMessage_fk_Character_id1 = receiver;
        return this;
    }
}
