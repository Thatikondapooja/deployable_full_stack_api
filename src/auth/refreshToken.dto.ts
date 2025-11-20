// src/auth/dto/refresh-token.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class RefreshTokenDto {
    @ApiProperty()
    @IsString()
    refreshToken: string;

    @ApiProperty()
    @IsNumber()
    userId: number;
}
