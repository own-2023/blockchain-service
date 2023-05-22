import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';


export class MintNftDto {

    @IsString()
    @IsNotEmpty()
    userId: number;

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


