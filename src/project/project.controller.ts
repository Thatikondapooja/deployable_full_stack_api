import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './create-project.dto';
import { UpdateProjectDto } from './update-project.dto';
import {  ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';

@ApiTags('Projects')

    @UseGuards(JwtAuthGuard, RolesGuard) // <-- protects all routes in this controller

 @ApiBearerAuth() // <-- This adds the lock icon for JWT


@Controller('project')
export class ProjectController {
    constructor(private service: ProjectService) { }



    @Roles('admin')
    @Post()
    create(@Body() body: CreateProjectDto) {
        console.log(body); // Should show { userId, username }
        // return body.user
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
    update(@Param('id', ParseIntPipe) projectId: number, @Body() body: UpdateProjectDto) {
        return this.service.update(projectId, body);
    }

    @Delete(':id')
    delete(@Param('id') projectId: number) {
        return this.service.delete(projectId);
    }

   
}

