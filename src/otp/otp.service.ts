import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { randomInt } from "crypto";
import { User } from "src/user/user.entity";
import { Otp } from "./otp.entity";
import { MailService } from "src/mail/mail.service";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt'
@Injectable()
export class OtpService {
    constructor(
        @InjectRepository(Otp) private otpRepo: Repository<Otp>,
        @InjectRepository(User) private userRepo: Repository<User>,
        private mailService: MailService,
    ) { }

    private generateOtpString(): string {
        return randomInt(0, 1_000_000).toString().padStart(6, '0');
    }

    async createAndSendOtp(email: string) {
        const user = await this.userRepo.findOne({
            where: { email },
        });

        console.log("OTP: Found user →", user);

        if (!user) throw new NotFoundException('User not found');

        const otpPlain = this.generateOtpString();
        console.log("otpPlain:", otpPlain);

        const otpHash = await bcrypt.hash(otpPlain, 10);
        console.log("otpHash:", otpHash);

        const otpEntity = this.otpRepo.create({
            user:user,           // ✔ FIXED — proper relation
            otpHash,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000),
        });

        await this.otpRepo.save(otpEntity);

        console.log("Sending OTP to:", user.email);

        await this.mailService.sendOtpEmail(user.email, otpPlain);

        return { message: 'OTP sent successfully' };
    }

    async verifyOtp(email: string, otp: string) {
        const user = await this.userRepo.findOne({ where: { email } });

        console.log("Verify OTP For User →", user);

        if (!user) throw new NotFoundException('User not found');

        const otpEntity = await this.otpRepo.findOne({
            where: { user :{userId:user.userId}},
            relations: ['user'],
            order: { createdAt: 'DESC' },
        });

        if (!otpEntity) throw new BadRequestException('No OTP found');

        if (new Date() > otpEntity.expiresAt) {
            await this.otpRepo.delete(otpEntity.id);
            throw new BadRequestException('OTP expired');
        }

        if (otpEntity.attempts >= 3) {
            await this.otpRepo.delete(otpEntity.id);
            throw new BadRequestException('Too many attempts');
        }

        const isMatch = await bcrypt.compare(otp, otpEntity.otpHash);

        if (!isMatch) {
            otpEntity.attempts++;
            await this.otpRepo.save(otpEntity);
            throw new BadRequestException('Invalid OTP');
        }

        await this.otpRepo.delete(otpEntity.id);

        return { message: 'OTP verified successfully', user };
    }
}
