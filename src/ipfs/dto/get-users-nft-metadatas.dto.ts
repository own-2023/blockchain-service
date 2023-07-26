import {  IsNotEmpty, IsUUID } from 'class-validator';

export class GetUsersNftMetadatasDto{

    @IsUUID()
    @IsNotEmpty()
    userId: string;
}
