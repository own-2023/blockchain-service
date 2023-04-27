import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EthTransactionsModule } from './eth-transactions/eth-transactions.module';
import { Web3Service } from './web3.service';
import Web3 from 'web3';

@Module({
  imports: [EthTransactionsModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: Web3Service,
    useFactory: () => {
      const ganacheUrl = 'http://127.0.0.1:7545'; // or whichever port your Ganache instance is running on
      const web3 = new Web3(new Web3.providers.HttpProvider(ganacheUrl));
      return new Web3Service(web3);
    },
  },],
  exports: [Web3Service]
})
export class AppModule {}
