import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/user.dto';
import { RefreshTokenDto } from './refreshToken.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body() body: CreateUserDto) {
        const user = await this.authService.validateUser(body.username, body.password);
        return this.authService.login(user);
    }

    @Post('refresh')
    async refresh(@Body() refreshTokenDto: RefreshTokenDto){
        // const { userId,refreshToken } = refreshTokenDto
        return this.authService.refreshToken(refreshTokenDto.userId, refreshTokenDto.refreshToken)
        // return this.authService.refreshToken(refreshTokenDto.userId, refreshTokenDto.refreshToken) it is without destructuring if destructuring like above in that destructure userId and reFreshToken are variables.if we use destructure it return like this... return this.authService.refreshToken(userId, refreshToken)


    }
}
