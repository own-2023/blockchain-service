import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class LazyMintNftDto {

    @IsNumber()
    @IsNotEmpty()
    user_id: number;

    @IsNumber()
    @IsNotEmpty()
    cid: number;

    @IsString()
    @IsNotEmpty()
    name: string;
}