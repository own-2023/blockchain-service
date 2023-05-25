import { IsString, IsNotEmpty, IsNumber, IsPositive, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';


export class MintNftDto {

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    imageUrl: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    from: string;

    @IsNumber()
    @IsPositive()
    @ApiProperty()
    price: number;

    @IsNumber()
    @IsPositive()
    @ApiProperty()
    tokenId: number;

    createdAt: Date;
    updatedAt: Date;
}


