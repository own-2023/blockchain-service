import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class LazyMintNftDto {

    @IsNumber()
    @IsNotEmpty()
    user_id: number;

    @IsString()
    @IsNotEmpty()
    cid: string;

    @IsString()
    @IsNotEmpty()
    name: string;
}