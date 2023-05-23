import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';


export class UploadNftDto {
    @IsString()
    @IsNotEmpty()
    creatorId: number;

    @IsNotEmpty()
    file: string;

    @IsString()
    @IsNotEmpty()
    nftName: string;


}