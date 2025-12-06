import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyOtpDto {
    @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  @Length(6, 6)
  otp: string;

  @Type(() => Number)
  // optional: previous step token or purpose; not required here
  purpose?: number;
}
