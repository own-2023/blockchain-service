import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';

export class SetPriceNftDto {

    @IsNumber()
    @IsPositive()
    @ApiProperty()
    tokenId: number;

    @IsNumber()
    @IsPositive()
    @ApiProperty()
    price: number;
}
