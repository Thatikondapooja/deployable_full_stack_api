import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Otp } from './otp.entity';
import * as bcrypt from 'bcrypt';
import { randomInt } from 'crypto';
import { User } from 'src/user/user.entity';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class OtpService {
    constructor(
        @InjectRepository(Otp) private otpRepo: Repository<Otp>,
        @InjectRepository(User) private userRepo: Repository<User>,
        private mailService: MailService,
    ) { }

    // generate a secure 6-digit OTP as string
    private generateOtpString(): string {
        // randomInt(0, 1_000_000) returns 0..999999
        const v = randomInt(0, 1_000_000).toString().padStart(6, '0');
        return v;
    }

    // create & send OTP to user's email. returns metadata (not raw otp).
    async createAndSendOtp(email: string, expirySeconds = 300) {
        const user = await this.userRepo.findOne({ where: { email } });
        if (!user) throw new NotFoundException('User not found');

        // Rate-limit: count previous issued OTPs in last X minutes (simple)
        const recentOtps = await this.otpRepo.find({
            where: { user },
            order: { createdAt: 'DESC' },
            take: 5,
        });

        // Simple rule: do not allow more than 5 sends in 1 hour
        const ONE_HOUR_MS = 60 * 60 * 1000;
        const now = Date.now();
        const recentIn1h = recentOtps.filter(o => now - o.createdAt.getTime() < ONE_HOUR_MS);
        if (recentIn1h.length >= 5) {
            throw new BadRequestException('Too many OTP requests. Try later.');
        }

        // Create OTP
        const otpPlain = this.generateOtpString(); // e.g. "035412"
        const saltRounds = 10;
        const otpHash = await bcrypt.hash(otpPlain, saltRounds);

        // Build entity
        const expiresAt = Date.now() + expirySeconds * 1000;
        const otpEntity = this.otpRepo.create({
            user,
            otpHash,
            expiresAt,
            attempts: 0,
            issuedCount: 1,
        });

        // save
        await this.otpRepo.save(otpEntity);

        // send via MailService (or SMS)
        await this.mailService.sendOtpEmail(user.email, otpPlain);

        // DO NOT return otpPlain to client
        return { message: 'OTP sent' };
    }

    // verify OTP; returns user if ok
    async verifyOtp(email: string, otpPlain: string) {
        const user = await this.userRepo.findOne({ where: { email } });
        if (!user) throw new NotFoundException('User not found');

        // Find the latest OTP for user
        const otpEntity = await this.otpRepo.findOne({
            where: { user },
            order: { createdAt: 'DESC' },
        });

        if (!otpEntity) throw new BadRequestException('No OTP found. Request a new one.');

        const now = Date.now();

        if (now > Number(otpEntity.expiresAt)) {
            // expired - delete the OTP record and tell user
            await this.otpRepo.delete(otpEntity.id);
            throw new BadRequestException('OTP expired. Request a new one.');
        }

        // if attempts exceeded (3), block this OTP
        if (otpEntity.attempts >= 3) {
            await this.otpRepo.delete(otpEntity.id);
            throw new BadRequestException('Too many failed attempts. Request a new OTP.');
        }

        const isMatch = await bcrypt.compare(otpPlain, otpEntity.otpHash);

        if (!isMatch) {
            // increment attempts
            otpEntity.attempts = otpEntity.attempts + 1;
            await this.otpRepo.save(otpEntity);
            throw new BadRequestException('Invalid OTP.');
        }

        // success: delete used OTP and return user (or user id)
        await this.otpRepo.delete(otpEntity.id);

        return user;
    }
}
