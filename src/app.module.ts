import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EthTransactionsModule } from './eth-transactions/eth-transactions.module';
import Web3 from 'web3';
import { EthTransactionsService } from './eth-transactions/eth-transactions.service';
import { IpfsModule } from './ipfs/ipfs.module';

@Module({
  imports: [EthTransactionsModule, IpfsModule],
  controllers: [AppController],
  providers: [
    AppService, 
    ],
})
export class AppModule {}
