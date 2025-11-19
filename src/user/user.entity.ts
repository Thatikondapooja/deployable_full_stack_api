import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/roles/role.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinColumn, JoinTable } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    userId: number;   // Primary Key, unique identifier

    @Column({ unique: true })
    username: string;  // User login name, must be unique

    @Column()
    password: string;  // Hashed password

    // @Column({ default: 'User' })
    // role: string;     // Optional: 'Admin', 'User', etc.

    @Column({nullable:true})
    refreshToken?:string  // stored hashed refresh tokens.

    @ManyToMany(()=>Role, (role)=>role.users,{eager:true})
    @JoinTable()
    roles:Role[]

}
