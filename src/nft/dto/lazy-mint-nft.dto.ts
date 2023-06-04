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

export class UserLazyMintNftDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    creator_id: string;

    @ApiProperty()
    cid: string;

    @ApiProperty()
    nftName: string;

    @ApiProperty()
    created_at: Date;
  }