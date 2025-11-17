import { Lists } from 'src/lists/lists.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';

@Entity('projects') // table name in database
export class Project {

    @PrimaryGeneratedColumn({ name: 'project_id' })
    projectId: number;

    @Column({ name: 'project_name', type: 'varchar', nullable: false })//here  name: 'project_name' is in entity attribute(column in db)
    projectName: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ name: 'start_date', type: 'date', nullable: true })
    startDate: Date;

    @Column({ name: 'target_end_date', type: 'date', nullable: true })
    targetEndDate: Date;

    @Column({ name: 'project_category', type: 'varchar', nullable: true })
    projectCategory: string;

    @Column({ name: 'team_members', type: 'text', array: true, nullable: true })
    teamMembers: string[];
  
    @OneToMany(() => Lists, (list) => list.project)// one project => many lists.
    list: Lists[];


    
      
 
    
    
}
