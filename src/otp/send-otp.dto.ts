import { IsEmail, IsNotEmpty } from 'class-validator';

export class SendOtpDto {
    @IsEmail()
    email: string;
}
