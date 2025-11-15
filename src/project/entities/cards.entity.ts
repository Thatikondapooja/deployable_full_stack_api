import { Column, Entity, PrimaryGeneratedColumn } from "typeorm/browser";

@Entity()
export class Cards{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    cardname:string;
    
}