import { EntityRelation } from './EntityRelation';
import Entity from '../Entity';

export type EntityStructure = {
    [property: string]: {
        type: 'string' | 'number' | 'bigint' | 'boolean' | 'symbol' | 'undefined' | 'object' | 'function';
        relationship?: {
            relationType: EntityRelation;
            entityClass: { new <T extends Entity>(): T };
            join: {
                from: string;
                through?: {
                    from: string;
                    to: string;
                };
                to: string;
            };
        };
    };
};
