import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Otps } from './otp.entity';
import { OtpService } from './otp.service';
import { User } from 'src/user/user.entity';
import { UserModule } from 'src/user/user.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Otps, User]),
    UserModule,
    MailModule,
  ],
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpModule { }
