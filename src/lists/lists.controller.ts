import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ListsService } from './lists.service';
import { CreateListsDto } from 'src/project/dto.ts/create-lists-dto';
import { ApiTags } from '@nestjs/swagger';
import { Lists } from 'src/project/entities/lists.entity';
@ApiTags('Project')
@Controller('lists')
export class ListsController {
    constructor(private service: ListsService) { }
    
        @Post()
        create(@Body() body: CreateListsDto) {
            
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
    
        // @Patch(':id')
        // update(@Param('id') id: number, @Body() body: UpdateProjectDto) {
        //     return this.service.update(id, body);
        // }
    
        @Delete(':id')
        delete(@Param('id') id: number) {
            return this.service.delete(id);
        }
}
