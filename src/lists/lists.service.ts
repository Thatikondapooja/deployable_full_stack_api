import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lists } from './lists.entity';
import { Project } from 'src/project/project.entity';
import { CreateListsDto } from './create-lists-dto';

@Injectable()
export class ListsService {
    cardRepository: any;
    listRepository: any;
    constructor(
        @InjectRepository(Lists)
        private listRepo: Repository<Lists>,

        @InjectRepository(Project)
        private projectRepo: Repository<Project>,
    ) { }

    // CREATE LIST
    async create(body: CreateListsDto) {
        // const { listName, projectId } = body;

        // 1. Find the project
        const project = await this.projectRepo.findOne({
            where: { projectId: body.projectId },
        });

        if (!project) {
            throw new NotFoundException(`Project with ID ${body.projectId } not found`);
        }

        // 2. Create the list and attach project
        const list = this.listRepo.create({
            listName: body.listName,
            project:project,   // attach the full project entity
        });

        // 3. Save
        return await this.listRepo.save(list);
    }

    // GET ALL LISTS
    findAll() {
        return this.listRepo.find({
            relations: ['project','cards'], // optional: include project details.if you remove it it can only display the list.
         
        });
    }

    // GET ONE LIST
    async findOne(id: number) {
        const list = await this.listRepo.findOne({
            where: { listId: id },
             relations: ['cards'],
        });

        if (!list) {
            throw new NotFoundException(`List with ID ${id} not found`);
        }

        return list;
    }

    // UPDATE LIST
    async update(id: number, body: any) {
        await this.listRepo.update(id, body);
        return this.findOne(id);
    }

    // DELETE LIST
    async delete(id: number) {
        const result = await this.listRepo.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`List with ID ${id} not found`);
        }

        return { message: "List deleted successfully" };
    }


    // async delete(listId: number) {
    //     await this.cardRepository.delete({ list: { listId } });

    //     return await this.listRepository.delete(listId);
    // }

}
