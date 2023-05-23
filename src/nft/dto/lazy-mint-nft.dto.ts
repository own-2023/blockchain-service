import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class LazyMintNftDto {

    @IsNumber()
    @IsNotEmpty()
    owner_id: number;

    @IsString()
    @IsNotEmpty()
    ipfs_id: number;

    @IsString()
    @IsNotEmpty()
    name: string;
}