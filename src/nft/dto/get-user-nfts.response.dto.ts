import { IsString, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class GetUserNftsResponseDto{

    @IsNotEmpty()
    @IsUUID()
    nftId: string;

    @IsNotEmpty()
    @IsNumber()
    nftPrice: number;

    @IsNotEmpty()
    @IsString()
    nftImageUrl: string;

    @IsNotEmpty()
    @IsString()
    nftName: string;


}
