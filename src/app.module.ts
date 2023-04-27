import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EthTransactionsModule } from './eth-transactions/eth-transactions.module';
import Web3 from 'web3';
import { EthTransactionsService } from './eth-transactions/eth-transactions.service';

@Module({
  imports: [EthTransactionsModule],
  controllers: [AppController],
  providers: [
    AppService, 
    ],
})
export class AppModule {}
