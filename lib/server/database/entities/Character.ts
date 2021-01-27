import { Model } from 'objection';
import Apartment from './Apartment';
import Business from './Business';
import Contact from './Contact';
import Faction from './Faction';
import House from './House';
import Inventory from './Inventory';
import Message from './Message';
import Skill from './Skill';
import User from './User';
import Vehicle from './Vehicle';

export default class Character extends Model {
    public id!: number;
    public firstName!: string;
    public lastName!: string;
    public cash!: number;
    public bank!: number;
    public dead!: boolean;
    public phoneNumber!: string;
    public health!: number;
    public armor!: number;
    public arrestTime?: number;
    public dimension!: number;
    public lastPosition!: string;
    public user!: User;
    public apartments?: Array<Apartment>;
    public businesses?: Array<Business>;
    public houses?: Array<House>;
    public inventory!: Inventory;
    public skills?: Array<Skill>;
    public vehicles?: Array<Vehicle>;
    public contacts?: Contact[];
    public holders?: Contact[];
    public faction?: Faction;
    public sentMessages?: Message[];
    public receivedMessages?: Message[];

    public static get tableName(): string {
        return 'characters';
    }

    public static get idColumn(): string {
        return 'id';
    }

    public static relationMappings() {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'characters.user_id',
                    to: 'users.id',
                },
            },
            apartments: {
                relation: Model.ManyToManyRelation,
                modelClass: Apartment,
                join: {
                    from: 'characters.id',
                    through: {
                        from: 'character_apartments.character_id',
                        to: 'character_apartments.apartment_id',
                    },
                    to: 'apartments.id',
                },
            },
            businesses: {
                relation: Model.ManyToManyRelation,
                modelClass: Business,
                join: {
                    from: 'characters.id',
                    through: {
                        from: 'character_businesses.character_id',
                        to: 'character_businesses.business_id',
                    },
                    to: 'businesses.id',
                },
            },
            houses: {
                relation: Model.ManyToManyRelation,
                modelClass: House,
                join: {
                    from: 'characters.id',
                    through: {
                        from: 'character_houses.character_id',
                        to: 'character_houses.house_id',
                    },
                    to: 'houses.id',
                },
            },
            inventory: {
                relation: Model.HasOneThroughRelation,
                modelClass: Inventory,
                join: {
                    from: 'characters.id',
                    through: {
                        from: 'character_inventories.character_id',
                        to: 'character_inventories.inventory_id',
                    },
                    to: 'inventories.id',
                },
            },
            skills: {
                relation: Model.ManyToManyRelation,
                modelClass: Skill,
                join: {
                    from: 'characters.id',
                    through: {
                        from: 'character_skills.character_id',
                        to: 'character_skills.skill_id',
                    },
                    to: 'skills.id',
                },
            },
            vehicles: {
                relation: Model.ManyToManyRelation,
                modelClass: Vehicle,
                join: {
                    from: 'characters.id',
                    through: {
                        from: 'character_vehicles.character_id',
                        to: 'character_vehicles.vehicle_id',
                    },
                    to: 'vehicles.id',
                },
            },
            // contacts: {
            //     relation: Model.ManyToManyRelation,
            //     modelClass: Contact,
            //     join: {
            //         from: 'characters.id',
            //         through: {
            //             from: 'character_contacts.character_id',
            //             to: 'character_contacts.contact_id',
            //         },
            //         to: 'contacts.id',
            //     },
            // },
            faction: {
                relation: Model.HasOneRelation,
                modelClass: Faction,
                join: {
                    from: 'characters.id',
                    to: 'factions.owner_id',
                },
            },
            // messages: {
            //     relation: Model.ManyToManyRelation,
            //     modelClass: Message,
            //     join: {
            //         from: 'characters.id',
            //         through: {
            //             from: 'character_contacts.character_id',
            //             to: 'character_contacts.message_id',
            //         },
            //         to: 'messages.id',
            //     },
            // },
        };
    }
}
