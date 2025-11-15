import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProjectService {
   
    constructor(
        @InjectRepository(Project)
        private repo: Repository<Project>,
    ) { }

   async create(body: any) {
       const project = this.repo.create(body);
       console.log("project", project)
       console.log("body", body)

        return this.repo.save(project);
    }

    findAll() {
        return this.repo.find();
    }

    async findOne(id: number) {
        const project=await this.repo.findOne({where:{id}});
        if (!project) throw new NotFoundException(`project with id${id}not found`);
        return project;
    }

    async update(id: number, body:any) {
        await this.repo.update(id, body)
        return this.findOne(id);
    }

    async delete (id: number) {
        const results=await this.repo.delete(id)
        if (results.affected === 0) throw new NotFoundException(`project with id${id}not found`) ;
        return {message:"project deleted successfully"}
    }
}



