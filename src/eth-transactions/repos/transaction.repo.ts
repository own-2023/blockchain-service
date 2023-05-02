import { Inject, Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import { CreateEthTransactionDto } from '../dto/create-eth-transaction.dto';
import { EthTransactionEntity } from '../entities/eth-transaction.entity';
import { UpdateEthTransactionDto } from '../dto/update-eth-transaction.dto';

@Injectable()
export class TransactionRepo {

  constructor(
  @InjectRepository(EthTransactionEntity) private transactionEntity : Repository<EthTransactionEntity>) {}


  
  create(createEthTransactionDto: CreateEthTransactionDto) {
    return 'This action adds a new ethTransaction';
  }

  async findAll() {
    console.log(await this.transactionEntity.find());
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

  add(createEthTransactionDto: CreateEthTransactionDto){

  }

}
