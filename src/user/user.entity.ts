import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    userId: number;   // Primary Key, unique identifier

    @Column({ unique: true })
    username: string;  // User login name, must be unique

    @Column()
    password: string;  // Hashed password

    @Column({ default: 'User' })
    role: string;     // Optional: 'Admin', 'User', etc.

    @Column({nullable:true})
    refreshToken?:string  // stored hashed refresh tokens
}
