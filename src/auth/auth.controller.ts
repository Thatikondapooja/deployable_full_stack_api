import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateRegisterDto } from './dto/register.dto';
import { CreateLoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './refreshToken.dto';
import { OtpService } from 'src/otp/otp.service';
import { VerifyOtpDto } from 'src/otp/verify-otp.dto';
import { SendOtpDto } from 'src/otp/send-otp.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,
    private otpService: OtpService) { }

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
        return this.otpService.createAndSendOtp(dto.email);
    }
    @Post('verify-otp')
    async verifyOtp(@Body() body: VerifyOtpDto) {
        if (!body.email || !body.otp) {
            throw new BadRequestException('Email and OTP are required');
        }

        const result = await this.otpService.verifyOtp(body.email, body.otp);
        console.log("result", result)
        if (!result || !result.user) {
            throw new BadRequestException('OTP verification failed');
        }

        return result;
    }
   
}
