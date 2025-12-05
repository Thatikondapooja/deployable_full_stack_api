import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Role } from 'src/roles/role.entity';
import { Otp } from 'src/otp/otp.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    userId: number;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column({ select: true })
    password: string; // hashed password

    @Column({ nullable: true })
    refreshToken?: string;

    @Column({ nullable: true })
    phoneNumber: string;

    @ManyToMany(() => Role, (role) => role.users, { eager: false })
    @JoinTable()
    roles: Role[];
    @OneToMany(() => Otp, (otp) => otp.user)
    otps: Otp[];

    
   
  
    
}
