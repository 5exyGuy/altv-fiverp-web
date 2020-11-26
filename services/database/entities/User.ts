import { BaseEntity, Column, Entity, OneToMany } from 'typeorm';
import { Character } from './Character';
import { LoginHistory } from './LoginHistory';

@Entity('User', { schema: 'test' })
export default class User extends BaseEntity {
    @Column('varchar', { name: 'username', length: 255 })
    username: string;

    @Column('varchar', { name: 'email', length: 255 })
    email: string;

    @Column('varchar', { name: 'password', length: 255 })
    password: string;

    @Column('datetime', { name: 'registrationDate' })
    registrationDate: Date;

    @Column('int', { primary: true, name: 'id' })
    id: number;

    @OneToMany(() => Character, (character) => character.fkUser)
    characters: Character[];

    @OneToMany(() => LoginHistory, (loginHistory) => loginHistory.fkUser)
    loginHistories: LoginHistory[];
}
