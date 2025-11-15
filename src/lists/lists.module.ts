import { Module } from '@nestjs/common';
import { ListsController } from './lists.controller';
import { ListsService } from './lists.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/project/entities/project.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project]), // 👈 Add this
  ],
  controllers: [ListsController],
  providers: [ListsService],
})
export class ListsModule { }
