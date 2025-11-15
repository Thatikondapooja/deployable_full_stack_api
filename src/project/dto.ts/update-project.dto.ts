import { ApiProperty } from "@nestjs/swagger";

export class UpdateProjectDto {

    @ApiProperty()
    projectname?: string;

    @ApiProperty()
    description?: string;

    @ApiProperty()
    startdate?: string;

    @ApiProperty()
    targetenddate?: string;

    @ApiProperty()
    projectcategory?: string;

    @ApiProperty({type:[String],required:false})
    teammembers?: string[];
}