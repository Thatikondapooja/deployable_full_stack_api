import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProjectDto } from './create-project.dto';

@Injectable()
export class ProjectService {
   
    constructor(
        @InjectRepository(Project)
        private repo: Repository<Project>,
    ) { }

    async create(body: any) {
       const project = this.repo.create(body);
        console.log("projectCategory", body.projectCategory)  
        console.log("projectName", body.projectName)

        console.log("teamMembers", body.teamMembers)

        console.log("project from service", project)

       console.log("body", body)

        return this.repo.save(project);
    }

    findAll() {
        return this.repo.find();
    }

    async findOne(projectId: number) {
        const project = await this.repo.findOne({ where: { projectId }});
        if (!project) throw new NotFoundException(`project with id${projectId}not found`);
        return project;
    }

    async update(projectId: number, body:any) {
        await this.repo.update(projectId, body)
        return this.findOne(projectId);
    }

    async delete(projectId: number) {
        const results = await this.repo.delete(projectId)
        if (results.affected === 0) throw new NotFoundException(`project with id${projectId}not found`) ;
        return {message:"project deleted successfully"}
    }
}



