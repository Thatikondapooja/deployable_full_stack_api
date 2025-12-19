import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateRegisterDto } from './dto/register.dto';
import { CreateLoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './refreshToken.dto';
import { OtpService } from 'src/otp/otp.service';
import { VerifyOtpDto } from 'src/otp/verify-otp.dto';
import { SendOtpDto } from 'src/otp/send-otp.dto';
import { ForgotPasswordDto } from 'src/otp/forgot-password.dto';
import { OtpPurpose } from 'src/otp/otp.entity';
import { VerifyForgotOtpDto } from 'src/otp/verify-forgot-otp.dto';
import { ResetPasswordDto } from 'src/otp/reset-password.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,
        private otpService: OtpService, private userService: UserService) { }

    @Post('register')
    async register(@Body() body: CreateRegisterDto) {
        return this.authService.register(body);
    }

    @Post('login')
    async login(@Body() body: CreateLoginDto) {
        console.log("login", body)
        return this.authService.login(body);
    }

    @Post('refresh')
    async refresh(@Body() body: RefreshTokenDto) {
        return this.authService.refreshToken(body.refreshToken, body.userId);
    }
    @Post('send-otp')
    sendOtp(@Body() dto: SendOtpDto) {
        console.log("OTP API CALLED WITH EMAIL =", dto.email);
        return this.otpService.createAndSendOtp(dto.email, dto.purpose);
    }
    @Post('verify-otp')
    async verifyOtp(@Body() body: VerifyOtpDto) {
        if (!body.email || !body.otp) {
            throw new BadRequestException('Email and OTP are required');
        }

        const result = await this.otpService.verifyOtp(body.email, body.otp, OtpPurpose.LOGIN);
        console.log("result", result)
        if (!result || !result.user) {
            throw new BadRequestException('OTP verification failed');
        }

        return result;
    }
    @Post('forgot-password')
    async forgotPassword(@Body() dto: ForgotPasswordDto) {
        // Create OTP with FORGOT_PASSWORD purpose
        return this.otpService.createAndSendOtp(dto.email, OtpPurpose.FORGOT_PASSWORD);
    }

    @Post('verify-forgot-otp')
    async verifyForgotOtp(@Body() dto: VerifyForgotOtpDto) {
        // Use the purpose from DTO to verify
        const result = await this.otpService.verifyOtp(
            dto.email,
            dto.otp,
            OtpPurpose.FORGOT_PASSWORD // always use FORGOT_PASSWORD here
        );

        return { message: 'OTP verified successfully' };
    }


  
    @Post('reset-password')
    async resetPassword(@Body() dto: { email: string, password: string }) {
        return this.authService.resetPassword(dto);
    }

}
