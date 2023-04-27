import { Injectable } from '@nestjs/common';
import { CreateEthTransactionDto } from './dto/create-eth-transaction.dto';
import { UpdateEthTransactionDto } from './dto/update-eth-transaction.dto';

@Injectable()
export class EthTransactionsService {
  create(createEthTransactionDto: CreateEthTransactionDto) {
    return 'This action adds a new ethTransaction';
  }

  findAll() {
    return `This action returns all ethTransactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ethTransaction`;
  }

  update(id: number, updateEthTransactionDto: UpdateEthTransactionDto) {
    return `This action updates a #${id} ethTransaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} ethTransaction`;
  }
}
