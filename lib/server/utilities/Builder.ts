export type IBuilder<T> = {
    [k in keyof T]-?: (arg: T[k]) => IBuilder<T>;
} & {
    build(): T;
};

type Clazz<T> = new (...args: any[]) => T;

/**
 * Create a Builder for a class. Returned objects will be of the class type.
 *
 * e.g. let obj: MyClass = Builder(MyClass).setA(5).setB("str").build();
 * @param type the name of the class to instantiate.
 * @param template optional class partial which the builder will derive initial params from.
 */
export function Builder<T>(type: Clazz<T>, template?: Partial<T>): IBuilder<T>;

/**
 * Create a Builder for an interface. Returned objects will be untyped.
 *
 * e.g. let obj: Interface = Builder<Interface>().setA(5).setB("str").build();
 * @param template optional partial object which the builder will derive initial params from.
 */
export function Builder<T>(template?: Partial<T>): IBuilder<T>;

export function Builder<T>(
    typeOrTemplate?: Clazz<T> | Partial<T>,
    template?: Partial<T>
): IBuilder<T> {
    let type: Clazz<T> | undefined;
    if (typeOrTemplate instanceof Function) {
        type = typeOrTemplate as Clazz<T>;
    } else {
        template = typeOrTemplate;
    }

    const built: any = template ? Object.assign({}, template) : {};

    const builder = new Proxy(
        {},
        {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            get(target, prop, receiver) {
                if ('build' === prop) {
                    if (type) {
                        // A class name (identified by the constructor) was passed. Instantiate it with props.
                        const obj: T = new type();
                        return () => Object.assign(obj, { ...built });
                    } else {
                        // No type information - just return the object.
                        return () => built;
                    }
                }

                return (x: any): any => {
                    built[prop] = x;
                    return builder;
                };
            },
        }
    );

    return builder as IBuilder<T>;
}
// export interface Validatable {
//     validate(): boolean;
// }
//
// export class DomainBuilder<T, C extends T> implements Validatable {
//     constructor(private creator: new (t: DomainBuilder<T, C> & T) => C) {}
//
//     with<K extends keyof T>(obj: Pick<T, K>): this & Pick<T, K> {
//         return Object.assign(this, obj);
//     }
//
//     validate(): boolean {
//         if ('validate' in this.creator.prototype) {
//             return this.creator.prototype.validate.bind(this).apply();
//         }
//
//         return true;
//     }
//
//     build(this: this & T): C {
//         if (this.validate()) {
//             return new this.creator(this);
//         }
//
//         throw new Error(`Object of type ${this.creator.name} could not be validated.`);
//     }
// }
//
// export class Builder<T> extends DomainBuilder<T, T> {}
