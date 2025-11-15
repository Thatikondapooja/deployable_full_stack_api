import { ApiProperty } from "@nestjs/swagger";

export class CreateListsDto{
     @ApiProperty()
        listname:string;
}