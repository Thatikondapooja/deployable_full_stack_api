import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';
import { ListsModule } from './lists/lists.module';
import { CardsModule } from './cards/cards.module';
import { RolesModule } from './roles/roles.module';
import { OtpModule } from './otp/otp.module';
import { MailService } from './mail/mail.service';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true, // for development
    }),
    UserModule,
    AuthModule,
    ProjectModule,
    ListsModule,
    CardsModule,
    RolesModule,
    OtpModule,
    MailModule,
  ],
  providers: [MailService],
})
export class AppModule { }
