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
      //TODO:  abi ile kontrakt adresini json dosyasından alıyoruz ve parse ettikten sonra abi ve kontrakt adresini döndürüyoruz
    
      const web3 = new Web3(new Web3.providers.HttpProvider(process.env.WEB3_HTTP_PROVIDER_URL));  
      return web3;
    },
  }]
})
export class NftModule {}
