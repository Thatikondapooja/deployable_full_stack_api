import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    projectname: string;

    @Column()
    description: string;

    @Column()
    startdate: string;

    @Column()
    targetenddate: string;

    @Column()
    projectcategory: string;

    @Column("text",{array:true})// some times multiple members.
    teammembers: string[];

    // @Column()            if we want only one teammember its fine.
    // teammembers:string;    
}
