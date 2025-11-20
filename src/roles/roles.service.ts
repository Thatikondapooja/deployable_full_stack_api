import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepo: Repository<Role>,
    ) { }

    async createRole(role: string) {
        const newRole = this.roleRepo.create({ role });
        return this.roleRepo.save(newRole);
    }

    async findRoleByName(roleName: string): Promise<Role | null> {
        return this.roleRepo.findOne({
            where: { role: roleName },
        });
    }

    async findAllRoles() {
        return this.roleRepo.find();
    }
}
