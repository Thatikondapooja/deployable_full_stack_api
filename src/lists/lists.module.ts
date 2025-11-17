import { Module } from '@nestjs/common';
import { ListsController } from './lists.controller';
import { ListsService } from './lists.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lists } from './lists.entity';
import { Project } from 'src/project/project.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lists,Project]), //  this is a entity name of list.
  ],
  controllers: [ListsController],
  providers: [ListsService],
})
export class ListsModule { }
