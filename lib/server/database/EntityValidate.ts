export type EntityValidate = {
    [property: string]: {
        type: 'string' | 'number' | 'bigint' | 'boolean' | 'symbol' | 'undefined' | 'object' | 'function';
    };
};
