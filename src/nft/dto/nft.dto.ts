import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class MintNftDto {
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsString()
    @IsNotEmpty()
    imageUrl: string;

    @IsNumber()
    @IsPositive()
    price: number;
}

export class SetPriceNftDto {

  @IsNumber()
  @IsPositive()
  tokenId: number;

  @IsNumber()
  @IsPositive()
  price: number;
}


/* 
export class MintNftDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  symbol: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsNumber()
  @IsPositive()
  tokenId: number;
}




*/