import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    private transporter;
    private logger = new Logger(MailService.name);

    constructor() {
        // configure using env vars for production
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: Number(process.env.SMTP_PORT) || 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    }

    async sendOtpEmail(to: string, otp: string) {
        const subject = 'Your login OTP';
        const text = `Your OTP is ${otp}. It expires in 5 minutes. If you didn't request this, ignore.`;

        // send mail
        await this.transporter.sendMail({
            from: process.env.SMTP_FROM || process.env.SMTP_USER,
            to,
            subject,
            text,
        });

        this.logger.log(`Sent OTP to ${to}`);
    }
}
