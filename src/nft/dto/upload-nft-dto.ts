import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';


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