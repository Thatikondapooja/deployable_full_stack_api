import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CardsService } from './cards.service';
import { CreatedCardsDtos } from './create-cards-dto';
import { UpdatesCardsDtos } from './UpdatecardsDto.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
@ApiTags('cards')
@UseGuards(JwtAuthGuard,RolesGuard) // <-- protects all routes in this controller
@ApiBearerAuth() // <-- This adds the lock icon for JWT

@Controller('cards')
export class CardsController {
    constructor(private service: CardsService){}
    @Roles('user')
   
    @Post()
    create(@Body() body:CreatedCardsDtos){
       return this.service.create(body) ;
    }
   
    @Get()
    findAll(){
        return this.service.findAll()
    }

    @Get(':id')
    findOne(@Param("id", ParseIntPipe) id:number){
        return this.service.findOne(id)
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdatesCardsDtos){
        return this.service.update(id,body)
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id:number){
        return this.service.delete(id)
    }
}
