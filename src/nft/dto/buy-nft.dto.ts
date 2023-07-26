import { IsString, IsNotEmpty, IsNumber, IsPositive, IsUUID } from 'class-validator';

export class BuyNftDto {
    @IsUUID()
    @IsNotEmpty()
    buyerId: string;
}
