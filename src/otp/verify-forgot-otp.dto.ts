import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyForgotOtpDto {
    @IsEmail()
    email: string;

    @IsString()
    @Length(6, 6)
    otp: string;

    @ApiProperty({ default: 'FORGOT_PASSWORD' })
    purpose: string; // optional, we can ignore since backend uses FORGOT_PASSWORD
}
