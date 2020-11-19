import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './User';

@Index('fk_LoginHistories_Users', ['userId'], {})
@Entity('loginhistory', { schema: 'fiverp' })
export class LoginHistory {
    @Column('int', { primary: true, name: 'id' })
    id: number;

    @Column('int', { name: 'userId' })
    userId: number;

    @Column('datetime', { name: 'date' })
    date: Date;

    @Column('varchar', { name: 'ip', length: 255 })
    ip: string;

    @Column('varchar', { name: 'socialId', length: 255 })
    socialId: string;

    @Column('varchar', { name: 'hwidExHash', length: 255 })
    hwidExHash: string;

    @Column('varchar', { name: 'hwidHash', length: 255 })
    hwidHash: string;

    @ManyToOne(() => User, (user) => user.loginHistories, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
    })
    @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
    user: User;
}
