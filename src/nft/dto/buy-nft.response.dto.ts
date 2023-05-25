import { IsString, IsNotEmpty, IsNumber, IsPositive, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';

export class BuyNftResponseDto {

    @IsNumber()
    @ApiProperty()
    price: number;

    @IsUUID()
    @IsPositive()
    @ApiProperty()
    tokenId: string;
}
