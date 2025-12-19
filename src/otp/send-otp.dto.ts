import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum } from 'class-validator';
import { OtpPurpose } from './otp.entity';

export class SendOtpDto {
    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty({ enum: OtpPurpose })
    @IsEnum(OtpPurpose)
    purpose: OtpPurpose;
}
