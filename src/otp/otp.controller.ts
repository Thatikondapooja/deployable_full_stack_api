import { Controller, Post, Body } from '@nestjs/common';
import { OtpService } from './otp.service';

import { AuthService } from 'src/auth/auth.service';
import { SendOtpDto } from './send-otp.dto';
import { VerifyOtpDto } from './verify-otp.dto';
@Controller('auth')
export class OtpController {
    constructor(private otpService: OtpService, private authService: AuthService) { }

    // POST /auth/send-otp  { email }
    @Post('send-otp')
    async sendOtp(@Body() dto: SendOtpDto) {
        return this.otpService.createAndSendOtp(dto.email);
    }

    // POST /auth/verify-otp  { email, otp }
    // On success, return JWT from authService (issueTokenForUser)
    @Post('verify-otp')
    async verifyOtp(@Body() dto: VerifyOtpDto) {
        const user = await this.otpService.verifyOtp(dto.email, dto.otp);
        // issue JWT (authService should have method to create tokens)
        const tokens = await this.authService.issueTokensForUser(user);
        return tokens;
    }
}
