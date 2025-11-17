import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './create-project.dto';
import { UpdateProjectDto } from './update-project.dto';
import {  ApiTags } from '@nestjs/swagger';

@ApiTags('Projects')

@Controller('project')
export class ProjectController {
    constructor(private service: ProjectService) { }

    @Post()
    create(@Body() body: CreateProjectDto) {
        
        return this.service.create(body);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    findOne(@Param('id') projectId: number) {
        return this.service.findOne(projectId);
    }

    @Patch(':id')
    update(@Param('id') projectId: number, @Body() body: UpdateProjectDto) {
        return this.service.update(projectId, body);
    }

    @Delete(':id')
    delete(@Param('id') projectId: number) {
        return this.service.delete(projectId);
    }
}

