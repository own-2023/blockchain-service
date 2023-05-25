import { IsString, IsNotEmpty, IsNumber, IsPositive, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';


export class MintNftDto {

    @IsUUID()
    @ApiProperty()
    @IsNotEmpty()

    userId: string;

    @IsString()
    @ApiProperty()
    @IsNotEmpty()

    name: string;

    @IsString()
    @ApiProperty()
    @IsNotEmpty()

    imageUrl: string;

    @IsString()
    @ApiProperty()
    @IsNotEmpty()

    from: string;

    @IsNumber()
    @ApiProperty()
    @IsPositive()

    price: number;

    @IsNumber()
    @ApiProperty()
    @IsPositive()

    tokenId: number;

    createdAt: Date;
    updatedAt: Date;
}


