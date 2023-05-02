import { Inject, Injectable } from '@nestjs/common';
import { CreateEthTransactionDto } from './dto/create-eth-transaction.dto';
import { UpdateEthTransactionDto } from './dto/update-eth-transaction.dto';
import Web3 from 'web3';
import { EthTransaction } from './entities/eth-transaction.entity';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

@Injectable()
export class EthTransactionsService {

  constructor(@Inject('WEB3') private readonly web3: Web3,
    @InjectRepository(EthTransaction) private ethTransactionRepository: Repository<EthTransaction>) { }

  async getWeb3ClientVersion(): Promise<string> {
    const version = await this.web3.eth.getNodeInfo();
    return version;
  }

  async getTransaction(transactionHash: string): Promise<any> {
    const transaction = await this.web3.eth.getTransaction(transactionHash);
    if (!transaction) {
      throw new Error(`Transaction ${transactionHash} not found`);
    }
    return transaction;
  }

  async sendTransaction(from: string, to: string, value: number): Promise<string> {
    const nonce = await this.web3.eth.getTransactionCount(from, 'latest');
    const gasPrice = await this.web3.eth.getGasPrice();
    const gasLimit = 21000;
    const transaction = {
      from,
      to,
      value: this.web3.utils.toWei(value.toString(), 'ether'),
      gasPrice,
      gasLimit,
      nonce,
    };
    const transactionHash = await this.web3.eth.sendTransaction(transaction);
    return transactionHash.transactionHash;
  }


  create(ethTransaction: EthTransaction) {
    this.ethTransactionRepository.save([ethTransaction]);
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
