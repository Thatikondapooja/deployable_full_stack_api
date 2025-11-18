import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
    ) { }

    
    // Create a new user with hashed password
    async create(body: CreateUserDto) {
        const { username, password } = body; // extract values from body
        const hashedPassword = await bcrypt.hash(password, 10); // hash password
        const user = this.userRepo.create({ username, password: hashedPassword });
        return this.userRepo.save(user);
    }

    async findByUsername(username: string) {
        return this.userRepo.findOne({ where: { username } });
        
    }
  
    async setRefreshToken(userId: number, refreshToken: string) {
        await this.userRepo.update(userId, { refreshToken });
    }

    async findById(userId: number) {
        return this.userRepo.findOne({ where: { userId } });
    }

}
