import { IsString, IsNotEmpty, IsNumber, IsPositive, IsUUID } from 'class-validator';

export class LazyMintNftDto {

    @IsUUID()
    @IsNotEmpty()
    ownerId: string;

    @IsUUID()
    @IsNotEmpty()
    ipfsId: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;
}