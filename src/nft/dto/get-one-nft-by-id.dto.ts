import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class GetOneNftByIdDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    ownerUsername: string;

}