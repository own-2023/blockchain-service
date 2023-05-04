import { Inject, Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import { CreateEthTransactionDto } from '../dtos/create-eth-transaction.dto';
import { EthTransaction } from '../entities/eth-transaction.entity';
import { UpdateEthTransactionDto } from '../dtos/update-eth-transaction.dto';

@Injectable()
export class EthTransactionRepository {

  constructor(
  @InjectRepository(EthTransaction) private ethTransactionRepository : Repository<EthTransaction>) {}


  
  create(createEthTransactionDto: CreateEthTransactionDto) {
    return 'This action adds a new ethTransaction';
  }

  save(createEthTransactionDto: CreateEthTransactionDto[]){
  }

  async findAll() {
    console.log(await this.ethTransactionRepository.find());
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
