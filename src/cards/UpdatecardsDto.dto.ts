import { ApiProperty } from "@nestjs/swagger";

export class UpdatesCardsDtos {

    @ApiProperty()
    listId: number;

    @ApiProperty()
    cardName?: string;
}