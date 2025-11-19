import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/roles/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
    constructor(@InjectRepository(Role) private roleRepo:Repository<Role>, ){}

    createRole(role:string){
        const roles=this.roleRepo.create({role});
        return this.roleRepo.save(roles);
    }

    findRoleByName(role:string){
        return this.roleRepo.findOne({where:{role}})
    }

    findAllRoles(){
        return this.roleRepo.find()
    }
}
