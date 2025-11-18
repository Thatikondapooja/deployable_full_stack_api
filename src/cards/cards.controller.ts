import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CardsService } from './cards.service';
import { CreatedCardsDtos } from './create-cards-dto';
import { UpdatesCardsDtos } from './UpdatecardsDto.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@ApiTags('cards')
@UseGuards(JwtAuthGuard) // <-- protects all routes in this controller
@ApiBearerAuth() // <-- This adds the lock icon for JWT

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
