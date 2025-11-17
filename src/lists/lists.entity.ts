import { Cards } from "src/cards/cards.entity";
import { Project } from "src/project/project.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Lists {
    @PrimaryGeneratedColumn()
    listId: number;

    @Column({nullable:true})
    listName: string;

    @ManyToOne(() => Project, (project) => project.list)
    @JoinColumn({ name: 'projectId' }) // explicitly map the foreign key // this project id is display in the list project id. if you dont put it it only prints null value.
    project: Project;

    @Column({ nullable: true })
    projectId: number; // now TypeORM will fill this automatically.

    @OneToMany(() => Cards, (card) => card.list)// one project => many lists.
        cards: Cards[];
    
}
