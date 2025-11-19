import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './user.dto';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/roles/role.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,

        @InjectRepository(Role)
        private roleRepo: Repository<Role>,
    ) { }

    // Create new user
    async create(body: CreateUserDto) {
        const { username, password, roles } = body;

        const existingUser = await this.userRepo.findOne({ where: { username } });
        if (existingUser) {
            throw new Error('Username already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const selectedRoles = await this.roleRepo.find({
            where: { role: In(roles) },
        });

        if (selectedRoles.length !== roles.length) {
            throw new NotFoundException('One or more roles do not exist');
        }

        const user = this.userRepo.create({
            username,
            password: hashedPassword,
            roles: selectedRoles,
        });

        return this.userRepo.save(user);
    }

    async createUser(body: CreateUserDto) {
        return this.create(body);
    }

    async findByUsername(username: string) {
        return this.userRepo.findOne({
            where: { username },
            relations: ['roles'],
        });
    }

    async findById(userId: number) {
        return this.userRepo.findOne({
            where: { userId },
            relations: ['roles'],
        });
    }

    async setRefreshToken(userId: number, refreshToken: string) {
        return this.userRepo.update(userId, { refreshToken });
    }

    async updateUserRoles(userId: number, roles: string[]) {
        const user = await this.findById(userId);
        if (!user) throw new NotFoundException('User not found');

        
        const selectedRoles = await this.roleRepo.find({
            where: { role: In(roles) },
        });
        console.log('Requested roles from request:', roles);
        console.log('Roles found in DB:', selectedRoles.map(r => r.role));


        if (selectedRoles.length !== roles.length) {
            throw new NotFoundException('One or more roles do not exist');
        }

        user.roles = selectedRoles;

        return this.userRepo.save(user);
    }
}
