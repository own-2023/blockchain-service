import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';

export class SetPriceNftDto {

    @IsString()
    @IsPositive()
    @ApiProperty()
    tokenId: string;

    @IsNumber()
    @IsPositive()
    @ApiProperty()
    price: number;
}
