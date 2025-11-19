// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { RolesService } from 'src/roles/roles.service';
import { RolesModule } from 'src/roles/roles.module';
import { Role } from 'src/roles/role.entity';

@Module({
  
  imports: [TypeOrmModule.forFeature([User,Role])], // Registers UserRepository
  controllers: [UserController],               // Handles HTTP requests
  providers: [UserService],                    // Business logic for users
  exports: [UserService],       // Export for other modules (AuthModule)

})
export class UserModule { }
