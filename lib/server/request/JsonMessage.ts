export enum MessageType {
    SUCCESS = 'success',
    INFO = 'info',
    WARNING = 'warning',
    ERROR = 'error',
}

type ConvertedJsonMessage = {
    message: string;
    type: MessageType;
};

export class JsonMessage {
    private constructor() {}

    public static convert(message: string, type: MessageType): ConvertedJsonMessage {
        return { message, type };
    }
}
