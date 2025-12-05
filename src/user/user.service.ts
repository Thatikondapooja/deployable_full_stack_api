import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { User } from './user.entity';
import { Role } from 'src/roles/role.entity';
import { CreateRegisterDto } from 'src/auth/dto/register.dto';
import * as bcrypt from 'bcrypt';
import { dot } from 'node:test/reporters';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UserService {
    delete(userId: number) {
        throw new Error('Method not implemented.');
    }

    constructor(
        @InjectRepository(User) private readonly userRepo: Repository<User>,
        @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
    ) { }

    async register(dto: CreateRegisterDto) {
        const { username, email, password, phoneNumber } = dto;
        const roles = dto.roles ?? ["user"]
        console.log("default user assign  from user service", roles)
        const existing = await this.userRepo.findOne({
            where: [{ username: dto.username }, { email: dto.email }],
        });
        if (existing) throw new Error('Username or Email already exists');

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("hashedPassword", hashedPassword)


        const userRoles = roles?.length ? await this.roleRepo.find({ where: { role: In(roles) } }) : [];
        if (userRoles.length === 0 || userRoles.length !== roles.length)
            throw new NotFoundException('One or more roles do not exist');

        const user = this.userRepo.create({
            username,
            email,
            password: hashedPassword,
            phoneNumber,
            roles: userRoles,
        });


        return this.userRepo.save(user);// save user in db.
    }

    async findByEmail(email: string) {
        return this.userRepo.findOne({
            where: { email }, relations: ['roles'], select: { userId: true, username: true, email: true, password: true, refreshToken: true, phoneNumber: true }, // Include password!
        });
    }


    async findById(userId: number) {
        return this.userRepo.findOne({
            where: { userId }, relations: ['roles'], select: {
                userId: true,
                username: true,
                email: true,
                password: true,
                refreshToken: true,
                phoneNumber: true,
            }
        });
    }

    async setRefreshToken(userId: number, refreshToken: string) {
        const user = await this.userRepo.findOne({ where: { userId } });
        if (!user) throw new NotFoundException('User not found');

        user.refreshToken = refreshToken;
        return this.userRepo.save(user);
    }
    async findOne(userId: number) {
        const user = await this.userRepo.findOne({ where: { userId } });
        if (!user) throw new NotFoundException(`project with id${userId}not found`);
        return user;
    }

    async update(userId: number, body: any) {
        await this.userRepo.update(userId, body)
        return this.findOne(userId);
    }

}
