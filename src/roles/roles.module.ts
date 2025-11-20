import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/roles/role.entity';
import { RoleSeeder } from './role.seed';

@Module({
  imports:[TypeOrmModule.forFeature([Role])],
  providers: [RolesService,RoleSeeder],
  controllers: [RolesController],
  exports: [RolesService]
})
export class RolesModule {}
