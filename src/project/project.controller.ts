import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto.ts/create-project.dto';
import { UpdateProjectDto } from './dto.ts/update-project.dto';
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
    findOne(@Param('id') id: number) {
        return this.service.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() body: UpdateProjectDto) {
        return this.service.update(id, body);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.service.delete(id);
    }
}

