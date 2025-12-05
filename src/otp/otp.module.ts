import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Otp } from './otp.entity';
import { OtpService } from './otp.service';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';   // ADD THIS

@Module({
  imports: [
    TypeOrmModule.forFeature([Otp]),
    UserModule,    // FIX 1 — Add UserModule
    AuthModule,    // optional if you use AuthService here
  ],
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpModule { }
