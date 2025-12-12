import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ListsService } from './lists.service';
import { CreateListsDto } from './create-lists-dto';
import { UpdateListsDto } from './update-lists.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';

@ApiTags('Lists')


    @UseGuards(JwtAuthGuard, RolesGuard) // <-- protects all routes in this controller
@ApiBearerAuth() // <-- This adds the lock icon for JWT

@Controller('lists')
export class ListsController {
    constructor(private service: ListsService) { }
    @Roles('user')
    @Post()
    create(@Body() body: CreateListsDto) {
        return this.service.create(body);
    }
    @Roles('user')
    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.service.findOne(id);
    }
  
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateListsDto) {
        return this.service.update(id, body);
    }
 
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.service.delete(id);
    }
}
