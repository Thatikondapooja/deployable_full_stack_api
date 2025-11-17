import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CardsService } from './cards.service';
import { CreatedCardsDtos } from './create-cards-dto';
import { UpdatesCardsDtos } from './UpdatecardsDto.dto';
@ApiTags('cards')
@Controller('cards')
export class CardsController {
    constructor(private service: CardsService){}

    @Post()
    create(@Body() body:CreatedCardsDtos){
       return this.service.create(body) ;
    }

    @Get()
    findAll(){
        return this.service.findAll()
    }

    @Get(':id')
    findOne(@Param("id") id:number){
        return this.service.findOne(id)
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() body: UpdatesCardsDtos){
        return this.service.update(id,body)
    }

    @Delete(':id')
    delete(@Param('id') id:number){
        return this.service.delete(id)
    }
}
