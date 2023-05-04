import { IsEmpty, IsString } from "class-validator";

export class MintNftDto{

    @IsEmpty()
    @IsString()
    nftName: string;

    @IsEmpty()
    nftImage;
}