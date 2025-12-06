import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SendOtpDto {
    @ApiProperty()
    @IsEmail()
    email: string;
}
