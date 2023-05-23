import { IsString, IsNotEmpty, IsNumber, IsPositive, IsUUID } from 'class-validator';



export class UploadNftDto {
    @IsUUID()
    @IsNotEmpty()
    creatorId: string;

    @IsNotEmpty()
    file: string;

    @IsString()
    @IsNotEmpty()
    nftName: string;


}