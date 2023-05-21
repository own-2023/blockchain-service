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

export class UploadNftDto {
  @IsString()
  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  file: string;

  @IsString()
  @IsNotEmpty()
  nft_name: string;


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