import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/project/entities/project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ListsService {
    constructor(
           @InjectRepository(Project)
           private repo: Repository<Project>,
       ) { }
   
      async create(body: any) {
          const list = this.repo.create(body);
          console.log("project", list)
          console.log("body", body)
   
           return this.repo.save(list);
       }
   
       findAll() {
           return this.repo.find();
       }
   
       async findOne(id: number) {
           const list=await this.repo.findOne({where:{id}});
           if (!list) throw new NotFoundException(`project with id${id}not found`);
           return list;
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
   
   
   
   