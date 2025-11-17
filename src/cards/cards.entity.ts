import { Lists } from "src/lists/lists.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cards{
    @PrimaryGeneratedColumn()
    cardId:number;

    // @Column({nullable:true})
    // listId:number;

    @Column({ nullable: true })
    cardName:string;

    @ManyToOne(() => Lists, (list) => list.cards)
     @JoinColumn({ name: "listId" }) 
    list:Lists;
   
   
    
}