// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Registers UserRepository
  controllers: [UserController],               // Handles HTTP requests
  providers: [UserService],                    // Business logic for users
  exports: [UserService],       // Export for other modules (AuthModule)
})
export class UserModule { }
