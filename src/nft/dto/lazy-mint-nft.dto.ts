import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class LazyMintNftDto {

    @IsNumber()
    @IsNotEmpty()
    ownerId: number;

    @IsString()
    @IsNotEmpty()
    ipfsId: number;

    @IsNumber()
    @IsNotEmpty()
    price: number;
}