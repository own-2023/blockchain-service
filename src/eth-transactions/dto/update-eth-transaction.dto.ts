import { PartialType } from '@nestjs/mapped-types';
import { CreateEthTransactionDto } from './create-eth-transaction.dto';

export class UpdateEthTransactionDto extends PartialType(CreateEthTransactionDto) {}
