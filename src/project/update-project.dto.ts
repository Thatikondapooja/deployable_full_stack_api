import { ApiProperty } from '@nestjs/swagger';

export class UpdateProjectDto {
    @ApiProperty()
    projectName?: string;

    @ApiProperty()
    description?: string;

    @ApiProperty()
    startDate?: string;   // ISO string: "2025-12-11"

    @ApiProperty()
    targetEndDate?: string;

    @ApiProperty()
    projectCategory?: string;

    @ApiProperty({ type: [String], required: false })
    teamMembers?: string[];
}
