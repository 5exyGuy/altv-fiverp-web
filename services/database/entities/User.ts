import { Column, Entity, OneToMany } from 'typeorm';
import { Character } from './Character';
import { LoginHistory } from './LoginHistory';

@Entity('user', { schema: 'fiverp' })
export class User {
    @Column('int', { primary: true, name: 'id' })
    id: number;

    @Column('varchar', { name: 'username', length: 255 })
    username: string;

    @Column('varchar', { name: 'email', length: 255 })
    email: string;

    @Column('varchar', { name: 'password', length: 255 })
    password: string;

    @Column('datetime', { name: 'registrationDate' })
    registrationDate: Date;

    @Column('datetime', { name: 'lastLogin' })
    lastLogin: Date;

    @OneToMany(() => Character, (character) => character.user)
    characters: Character[];

    @OneToMany(() => LoginHistory, (loginhistory) => loginhistory.user)
    loginHistories: LoginHistory[];
}
