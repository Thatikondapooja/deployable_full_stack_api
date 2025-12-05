// src/user/user.controller.ts
import { Controller, Post, Body, UseGuards, ParseIntPipe, Param, Patch, Delete, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';

@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) { }

    // @Post('register')
    // async register(@Body() body: CreateUserDto) {
    //     return this.userService.register(body);
    // }
    // @Post()
    // create(@Body() body: CreateUserDto) {
    //         console.log("body from controller",body); // Should show { userId, username }
    //         // return body.user
    //     return this.userService.create(body);
    //     }
    
    //     @Get()
    //     findAll() {
    //         return this.userService.findAll();
    //     }
    
        @Get(':id')
        findOne(@Param('id', ParseIntPipe) userId: number) {
            return this.userService.findOne(userId);
        }
    
        @Patch(':id')
        update(@Param('id', ParseIntPipe) userId: number, @Body() body: CreateUserDto) {
            return this.userService.update(userId, body);
        }
    
        @Delete(':id')
        delete(@Param('id', ParseIntPipe) userId: number) {
            return this.userService.delete(userId);
        }

}
