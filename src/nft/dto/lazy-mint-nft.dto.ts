import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsPositive, IsUUID } from 'class-validator';

export class LazyMintNftDto {

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty()
    ownerId: string;

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty()
    ipfsId: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    price: number;
}