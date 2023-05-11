import { Module } from '@nestjs/common';
import { EthTransactionsService } from './eth-transactions.service';
import { EthTransactionsController } from './eth-transactions.controller';
import Web3 from 'web3';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EthTransaction } from './entities/eth-transaction.entity';
import { EthTransactionRepository } from './repositories/eth-transaction.repository';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [TypeOrmModule.forFeature([EthTransaction])],
  controllers: [EthTransactionsController],
  providers: [EthTransactionsService, {
    provide: 'WEB3',
    useFactory: () => {
      const web3 = new Web3(new Web3.providers.HttpProvider(process.env.WEB3_HTTP_PROVIDER_URL));
      return web3;
    },
  }, EthTransactionRepository],
  exports: ['WEB3']
})
export class EthTransactionsModule { }
