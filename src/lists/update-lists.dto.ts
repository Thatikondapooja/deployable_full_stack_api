import { ApiProperty } from "@nestjs/swagger";

export class UpdateListsDto {
        @ApiProperty()
        projectId: number;

        // @ApiProperty()
        // listId: number;

        @ApiProperty()
        listName?: string;





}