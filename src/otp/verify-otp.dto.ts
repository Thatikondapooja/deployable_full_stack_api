import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { Type } from 'class-transformer';

export class VerifyOtpDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(6, 6)
  otp: string;

  @Type(() => Number)
  // optional: previous step token or purpose; not required here
  purpose?: number;
}
