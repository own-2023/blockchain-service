import { IsString, IsNotEmpty, IsNumber, IsPositive, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';


export class UploadNftDto {
    @IsUUID()
    @IsNotEmpty()
    @ApiProperty()
    creatorId: string;

    @IsNotEmpty()
    @ApiProperty()
    file: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    nftName: string;


}