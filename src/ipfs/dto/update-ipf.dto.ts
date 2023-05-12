import { PartialType } from '@nestjs/mapped-types';
import { CreateIpfDto } from './create-ipf.dto';

export class UpdateIpfDto extends PartialType(CreateIpfDto) {}
