import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatedCardsDtos } from './create-cards-dto';
import { Repository } from 'typeorm';
import { Cards } from './cards.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Lists } from 'src/lists/lists.entity';

@Injectable()
export class CardsService {
   constructor(@InjectRepository(Cards) private cardRepo:Repository<Cards>,
 @InjectRepository(Lists)
       private listRepo: Repository<Lists>) { }

//    async create(body:CreatedCardsDtos){
//        const card = this.cardRepo.create(body)
//        return this.cardRepo.save(card);
//      }
    async create(body: CreatedCardsDtos) {
            //  const { cardName, listId } = body;
     
             // 1. Find the project
        const list = await this.listRepo.findOne({
                 where: { listId:body.listId },
             });
     
        if (!list) {
            throw new NotFoundException(`list with ID ${body.listId} not found`);
             }
     
             // 2. Create the list and attach project
             const card = this.cardRepo.create({
                 cardName:body.cardName,
                 list:list,   // attach the full project entity
             });
     
             // 3. Save
             return await this.cardRepo.save(card);
         }
 
     findAll() {
         return this.cardRepo.find({
            relations:['list']
         });
     }
 
    //  async findOne(cardId: number) {
    //      const card = await this.cardRepo.findOne({ where: { cardId }});
    //      if (!card) throw new NotFoundException(`card with id ${cardId} not found`);
    //      return card;
    //  }

    // GET ONE LIST
    async findOne(id: number) {
        const card = await this.cardRepo.findOne({
            where: { cardId: id },
            // relations: ['project'],
        });

        if (!card) {
            throw new NotFoundException(`card with ID ${id} not found`);
        }

        return card;
    }

 
    async update(cardId: number, body:any) {
        await this.cardRepo.update(cardId, body)
        return this.findOne(cardId);
     }
 
    async delete(cardId: number) {
        const results = await this.cardRepo.delete({cardId})
        if (results.affected === 0) throw new NotFoundException(`card with id ${cardId} not found`) ;
         return {message:"card deleted successfully"}
     }
 }
 
 
 
 