import { Module } from '@nestjs/common';
import { EthTransactionsService } from './eth-transactions.service';
import { EthTransactionsController } from './eth-transactions.controller';
import Web3 from 'web3';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EthTransaction } from './entities/eth-transaction.entity';
import { EthTransactionRepository } from './repos/transaction.repo';

@Module({
  imports: [TypeOrmModule.forFeature([EthTransaction])],
  controllers: [EthTransactionsController],
  providers: [EthTransactionsService, {
    provide: 'WEB3',
    useFactory: () => {
      const ganacheUrl = 'http://127.0.0.1:7545'; // or whichever port your Ganache instance is running on
      const web3 = new Web3(new Web3.providers.HttpProvider(ganacheUrl));
      return web3;
    },
  }, EthTransactionRepository],
  exports: ['WEB3']
})
export class EthTransactionsModule { }
