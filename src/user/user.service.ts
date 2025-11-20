import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { User } from './user.entity';
import { Role } from 'src/roles/role.entity';
import { CreateRegisterDto } from 'src/auth/dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepo: Repository<User>,
        @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
    ) { }

    async register(dto: CreateRegisterDto) {
        const { username, email, password, roles } = dto;

        const existing = await this.userRepo.findOne({
            where: [{ username }, { email }],
        });
        if (existing) throw new Error('Username or Email already exists');

        const hashedPassword = await bcrypt.hash(password, 10);

        const userRoles = await this.roleRepo.find({ where: { role: In(roles) } });
        if (userRoles.length === 0 || userRoles.length !== roles.length)
            throw new NotFoundException('One or more roles do not exist');

        const user = this.userRepo.create({
            username,
            email,
            password: hashedPassword,
            roles: userRoles,
        });

        return this.userRepo.save(user);// save user in db.
    }

    async findByEmail(email: string) {
        return this.userRepo.findOne({ where: { email }, relations: ['roles'] });
    }

    async findById(userId: number) {
        return this.userRepo.findOne({ where: { userId }, relations: ['roles'] });
    }

    async setRefreshToken(userId: number, refreshToken: string) {
        const user = await this.userRepo.findOne({ where: { userId } });
        if (!user) throw new NotFoundException('User not found');

        user.refreshToken = refreshToken;
        return this.userRepo.save(user);
    }
}
