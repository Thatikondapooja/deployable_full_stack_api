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

    @ApiProperty()
    phoneNumber: string;

    @ApiProperty({ example: ['user'], required: false })
    roles?: string[];

}
