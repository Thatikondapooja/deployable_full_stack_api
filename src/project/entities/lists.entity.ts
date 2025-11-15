import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Lists{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    listname:string;

}