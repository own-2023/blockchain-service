import { Module } from '@nestjs/common';
import { NftService } from './nft.service';
import { NftController } from './nft.controller';
import Web3 from 'web3';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  controllers: [NftController],
  providers: [NftService, {
    provide: 'WEB3',
    useFactory: () => {
      const ganacheUrl = 'http://127.0.0.1:7545'; // or whichever port your Ganache instance is running on
      const web3 = new Web3(new Web3.providers.HttpProvider(ganacheUrl));
      
      return web3;
    },
  }]
})
export class NftModule {}
