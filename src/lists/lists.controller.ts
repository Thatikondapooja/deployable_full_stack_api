import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ListsService } from './lists.service';
import { CreateListsDto } from './create-lists-dto';
import { UpdateListsDto } from './update-lists.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Lists')
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

    @Patch(':id')
    update(@Param('id') id: number, @Body() body: UpdateListsDto) {
        return this.service.update(id, body);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.service.delete(id);
    }
}
