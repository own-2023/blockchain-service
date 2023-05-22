import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';


export class SetPriceNftDto {

    @IsNumber()
    @IsPositive()
    tokenId: number;
  
    @IsNumber()
    @IsPositive()
    price: number;
  }
  