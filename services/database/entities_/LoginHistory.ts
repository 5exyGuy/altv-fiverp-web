import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './User';

@Index('fk_User_id', ['fkUserId'], { unique: true })
@Entity('LoginHistory', { schema: 'test' })
export class LoginHistory extends BaseEntity {
    @Column('datetime', { name: 'date' })
    date: Date;

    @Column('varchar', { name: 'ip', length: 255 })
    ip: string;

    @Column('varchar', { name: 'socialId', length: 255 })
    socialId: string;

    @Column('binary', { name: 'hwidExHash', length: 1 })
    hwidExHash: Buffer;

    @Column('binary', { name: 'hwidHash', length: 1 })
    hwidHash: Buffer;

    @Column('int', { primary: true, name: 'id' })
    id: number;

    @Column('int', { name: 'fk_User_id', unique: true })
    fkUserId: number;

    @ManyToOne(() => User, (user) => user.loginHistories, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    })
    @JoinColumn([{ name: 'fk_User_id', referencedColumnName: 'id' }])
    fkUser: User;
}
