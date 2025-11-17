import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cards } from './cards.entity';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { Lists } from 'src/lists/lists.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cards,Lists])  // ✅ Make repository available
  ],
  providers: [CardsService],
  controllers: [CardsController]
})
export class CardsModule { }
