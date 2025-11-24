import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateRegisterDto } from './dto/register.dto';
import { CreateLoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './refreshToken.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

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
}
