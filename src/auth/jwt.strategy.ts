import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UserService) {
   
   
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'yourSecretKey', // same secret as JwtModule
        });
    }

    async validate(payload: any) {
        // Adds "req.user" automatically
        console.log("payload", payload)

        const user = await this.usersService.findById(payload.sub);
        // Option A: return full user (recommended)
        if (!user) return null;

        // Return object that will populate request.user
        return {
            userId: user.userId,
            username: user.username,
            email: user.email,
            roles: user.roles.map(r => r.role), // <- MUST be array of strings
        };
    }
}
