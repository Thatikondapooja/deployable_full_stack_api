import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from 'src/user/user.entity';

@Entity('otps')
export class Otp {
    @PrimaryGeneratedColumn()
    id: number;

    // Link to user
    @ManyToOne(() => User, user => user.otps, { onDelete: 'CASCADE' })
    user: User;

    // Hashed OTP value
    @Column()
    otpHash: string;

    // expire timestamp (ms since epoch)
    @Column({ type: 'bigint' })
    expiresAt: number;

    // number of verification attempts
    @Column({ default: 0 })
    attempts: number;

    // number of times OTP was issued (rate limiting)
    @Column({ default: 1 })
    issuedCount: number;

    // created timestamp
    @CreateDateColumn()
    createdAt: Date;
}
