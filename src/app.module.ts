import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProjectModule } from './project/project.module';
import { ListsModule } from './lists/lists.module';

@Module({
  imports: [
    
    // Load .
    // env file
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Database Connection Setup
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,     // Loads all entities automatically
      synchronize: true,          // ❗For development only
    }),

    ProjectModule,

    ListsModule,
  ],
})
export class AppModule { }
