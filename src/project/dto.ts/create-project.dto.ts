import { ApiProperty } from "@nestjs/swagger";

export class CreateProjectDto{
    @ApiProperty()
    projectname:string;

    @ApiProperty()
    description:string;

    @ApiProperty()
    startdate:string;

    @ApiProperty()
    targetenddate:string;

    @ApiProperty()
    projectcategory:string;

    @ApiProperty({type:[String]})
    teammembers:string[];
}