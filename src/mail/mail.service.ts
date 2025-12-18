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
        if (!to) throw new Error('Recipient email is required');

        await this.transporter.sendMail({
            from: `"YourApp Security" <${process.env.MAIL_USER}>`,
            to,
            subject: 'Verify Your Email – One-Time Password',
            html: `
        <div style="font-family: Arial, sans-serif; background-color: #f6f8fa; padding: 24px;">
          <div style="max-width: 480px; margin: auto; background: #ffffff; padding: 24px; border-radius: 8px;">
            
            <h2 style="color: #1a73e8; margin-bottom: 16px;">Email Verification</h2>
            
            <p style="font-size: 14px; color: #333;">
              Hello,
            </p>

            <p style="font-size: 14px; color: #333;">
              Use the following One-Time Password (OTP) to complete your sign-in.
            </p>

            <div style="
              font-size: 28px;
              font-weight: bold;
              letter-spacing: 6px;
              text-align: center;
              margin: 24px 0;
              color: #111;
            ">
              ${otp}
            </div>

            <p style="font-size: 13px; color: #c90b0bff;">
              This OTP is valid for <strong>5 minutes</strong>.  
              Please do not share this code with anyone.
            </p>

            <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />

            <p style="font-size: 12px; color: #777;">
              If you did not request this verification, please ignore this email.
            </p>

            <p style="font-size: 12px; color: #777; margin-top: 16px;">
              — YourApp Security Team
            </p>

          </div>
        </div>
        `,
        });

        console.log(`OTP email sent to ${to}`);
    }

}
