import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async createUser(body: CreateUserDto) {
        return this.userService.createUser(body);
    }

    async validateUser(username: string, password: string) {
        const user = await this.userService.findByUsername(username);
        if (!user) throw new UnauthorizedException('Invalid username');

        const isPasswordMatching = await bcrypt.compare(password, user.password);
        if (!isPasswordMatching) throw new UnauthorizedException('Invalid password');

        return user;
    }

    async login(user: any) {
        const payload = {
            username: user.username,
            sub: user.userId,
            roles: user.roles.map((r => r.role)),
        };

        const access_token = this.jwtService.sign(payload, { expiresIn: '15m' });
        const refresh_token = this.jwtService.sign(payload, { expiresIn: '7d' });

        const hashedRefreshToken = await bcrypt.hash(refresh_token, 10);
        await this.userService.setRefreshToken(user.userId, hashedRefreshToken);

        return { access_token, refresh_token };
    }

    async refreshToken(refreshToken: string, userId: number) {
        const user = await this.userService.findById(userId);
        if (!user || !user.refreshToken) throw new UnauthorizedException();

        const isValid = await bcrypt.compare(refreshToken, user.refreshToken);
        if (!isValid) throw new UnauthorizedException();

        const payload = {
            username: user.username,
            sub: user.userId,
            roles: user.roles.map((r) => r.role),
        };

        const access_token = this.jwtService.sign(payload, { expiresIn: '15m' });
        return { access_token };
    }
}
