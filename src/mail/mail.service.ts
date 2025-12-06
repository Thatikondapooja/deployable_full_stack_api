import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS, // NOT Gmail password
            },
        });
    }

    async sendOtpEmail(to: string, otp: string) {
        if (!to) {
            throw new Error('Recipient email is required'); // safeguard
        }
        await this.transporter.sendMail({
            
            from: process.env.MAIL_USER,
            to,
            subject: 'Your OTP Code',
            text: `Your OTP is: ${otp}. It is valid for 5 minutes.`,
        });
        console.log(`OTP sent to ${to}`);

    }
}
