import {  IsUUID, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';


export class PutNftOnSaleDto {

    @IsNotEmpty()
    @ApiProperty()
    @IsPositive()
    @IsUUID()
    tokenId: string

    @IsNotEmpty()
    @ApiProperty()
    @IsPositive()
    @IsNumber()
    price: number;
}