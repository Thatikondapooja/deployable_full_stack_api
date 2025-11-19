import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';

@Injectable()
export class RoleSeeder implements OnModuleInit {
    constructor(
        @InjectRepository(Role)
        private roleRepo: Repository<Role>,
    ) { }

    async onModuleInit() {
        await this.seed();
    }

    async seed() {
        const roles = ['admin', 'user'];

        for (const name of roles) {
            const exists = await this.roleRepo.findOne({ where: { role: name } });
            if (!exists) {
                await this.roleRepo.save({ role: name });
            }
        }
    }
}
