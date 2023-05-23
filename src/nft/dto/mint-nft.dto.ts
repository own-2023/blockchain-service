import { IsString, IsNotEmpty, IsNumber, IsPositive, IsUUID } from 'class-validator';


export class MintNftDto {

    @IsUUID()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    imageUrl: string;

    @IsString()
    @IsNotEmpty()
    from: string;

    @IsNumber()
    @IsPositive()
    price: number;

    @IsNumber()
    @IsPositive()
    tokenId: number;

    createdAt: Date;
    updatedAt: Date;
}


