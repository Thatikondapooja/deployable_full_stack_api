import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { CreateRegisterDto } from './dto/register.dto';
import { CreateLoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
         @InjectRepository(User) private readonly userRepo: Repository<User>
    ) { }

    async register(dto: CreateRegisterDto) {
        return this.userService.register(dto);
    }

    async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);
        console.log(" user from auth service:", user);

        console.log("INPUT PASSWORD:", password);
        console.log("DB PASSWORD:", user?.password);
       


        if (!user) throw new UnauthorizedException('Invalid Email');

        if (!user.password) {
            console.log("PASSWORD IS MISSING FROM DB RESPONSE!");
            throw new UnauthorizedException('Password missing');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("COMPARE RESULT:", isMatch);

        if (!isMatch) throw new UnauthorizedException('Invalid password');
        return user;
    }

    async login(dto: CreateLoginDto) {
        const user = await this.validateUser(dto.email, dto.password);
      
        const payload = { sub: user.userId,
             roles: user.roles.map(r => r.role) };
             
        const access_token = this.jwtService.sign(payload, { expiresIn: '5s' });
        const refresh_token = this.jwtService.sign(payload, { expiresIn: '9s' });

        const hashedRefreshToken = await bcrypt.hash(refresh_token, 10);
        await this.userService.setRefreshToken(user.userId, hashedRefreshToken);
        console.log("hashedRefreshToken", hashedRefreshToken)
        return {
            access_token,
            refresh_token,
            user: {
                userId: user.userId,
                email: user.email,
                username: user.username,
                phoneNumber:user.phoneNumber,
                roles: user.roles.map(r => r.role),
            },
      
        };
    }

    async refreshToken(refreshToken: string, userId: number) {
        const user = await this.userService.findById(userId);
        if (!user || !user.refreshToken) throw new UnauthorizedException();

        const isValid = await bcrypt.compare(refreshToken, user.refreshToken);
        if (!isValid) throw new UnauthorizedException();

        const payload = { sub: user.userId, roles: user.roles.map(r => r.role) };
        const access_token = this.jwtService.sign(payload, { expiresIn: '20s' });

        return { access_token };
      
    }
    async issueTokensForUser(user: User) {
        const payload = {
            sub: user.userId, email: user.email, roles: user.roles.map(r => r.role),
 };
        const access = this.jwtService.sign(payload, { expiresIn: '15m' });
        console.log(" access from issueTokensForUser", access)
        const refresh = this.jwtService.sign({ sub: user.userId }, { expiresIn: '7d' });
        console.log(" refresh from issueTokensForUser", refresh)
        return {
            access_token: access, refresh_token: refresh, user: {
                userId: user.userId, email: user.email, roles: user.roles.map(r => r.role)
                
} };
    }

    async resetPassword(dto: { email: string, password: string }) {
        const user = await this.userRepo.findOne({ where: { email: dto.email } });

        if (!user) throw new NotFoundException("User not found");

        user.password = await bcrypt.hash(dto.password, 10);

        await this.userRepo.save(user);

        return { message: "Password updated successfully" };
    }

    
}
