import { IsEmail, IsString, MinLength, ArrayNotEmpty, ArrayUnique } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRegisterDto {
    @ApiProperty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
 
    password: string;

    @ApiProperty({ example: ['user'] })
    @ArrayNotEmpty()
    @ArrayUnique()
    roles: string[];
}
