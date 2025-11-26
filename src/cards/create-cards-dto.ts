import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNumberString } from "class-validator";

export class CreatedCardsDtos{
       
        @ApiProperty()
        listId: number;

        @ApiProperty()
        cardName:string;
}