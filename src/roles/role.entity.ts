import { User } from 'src/user/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    role: string; // e.g., 'Admin', 'User', 'Manager'
    @ManyToMany(() => User, (user) => user.roles)
    users: User[];
}
