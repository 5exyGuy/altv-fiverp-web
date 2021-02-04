import { Model } from 'objection';
import { Builder, IBuilder } from '../utilities/Builder';
import { EntityValidate } from './EntityValidate';

export interface IEntity {
    id?: number;
}

export abstract class Entity<TModelConstructor extends typeof Model, TModel extends Model, T extends IEntity> {
    private readonly _updateFields: Map<string, any>;
    private readonly _updateRelationFields: Map<string, any>;

    public entityModelConstructor: TModelConstructor;
    public entityModel: TModel;

    protected constructor(builder?: IBuilder<T>) {
        this._updateFields = new Map();
        this._updateRelationFields = new Map();

        if (builder) {
            const entity: T = builder.build();
            for (const prop in entity) {
                this[<string>prop] = entity[prop];
            }
        }
    }

    protected setUpdateField(fieldName: string, value: any): void {
        this._updateFields.set(fieldName, value);
    }

    protected removeUpdateField(fieldName: string): void {
        this._updateFields.delete(fieldName);
    }

    protected setUpdateRelationField(fieldName: string, value: any): void {
        this._updateRelationFields.set(fieldName, value);
    }

    protected removeUpdateRelationField(fieldName: string): void {
        this._updateRelationFields.delete(fieldName);
    }

    protected updateLocalFields(fields?: { [key: string]: any }): void {
        if (!fields) fields = Object.fromEntries(this._updateFields);
        for (const fieldName in fields) this[`_${fieldName}`] = fields[fieldName];
    }

    protected updateLocalRelationFields(fields?: { [key: string]: any }): void {
        if (!fields) fields = Object.fromEntries(this._updateRelationFields);
        for (const fieldName in fields) this[`_${fieldName}`] = fields[fieldName];
    }

    public static Builder(): IBuilder<IEntity> {
        return Builder<IEntity>();
    }

    public static get validate(): EntityValidate {
        return {
            id: { type: 'number' },
        };
    }
}
