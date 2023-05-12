import { IsEmpty, IsString } from "class-validator";

export class MintNftDto2{

    @IsEmpty()
    @IsString()
    nftName: string;

    @IsEmpty()
    nftImage;
}