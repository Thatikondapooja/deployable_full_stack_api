import { ApiProperty } from "@nestjs/swagger";

export class CreatedCardsDtos{
        
        @ApiProperty()
        listId: number;

        @ApiProperty()
        cardName:string;
}