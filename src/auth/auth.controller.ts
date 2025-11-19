import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    async signup(@Body() body: CreateUserDto) {
        return this.authService.createUser(body);
    }

    @Post('login')
    async login(@Body() body: CreateUserDto) {
        const user = await this.authService.validateUser(body.username, body.password);
        return this.authService.login(user);
    }

    @Post('refresh')
    async refresh(@Body() body: { refreshToken: string; userId: number }) {
        return this.authService.refreshToken(body.refreshToken, body.userId);
    }
}
