import { IsString, IsNumber } from 'class-validator';

export class RefreshTokenDto {
    @IsNumber()
    userId: number;

    @IsString()
    refreshToken: string;
}
