import { PartialType } from '@nestjs/mapped-types';
import { MintNftDto } from './nft.dto';

export class UpdateNftDto extends PartialType(MintNftDto) {}
