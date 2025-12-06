import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn } from 'typeorm';
import { User } from 'src/user/user.entity';

@Entity()
export class Otp {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => User, user => user.otps)
    user: User;

    @Column()
    otpHash: string;

    @Column({type:'timestamp'})
    expiresAt: Date;

    @Column({ default: 0 })
    attempts: number;

    @Column({ default: 1 })
    issuedCount: number;

    @CreateDateColumn()
    createdAt: Date;
}
