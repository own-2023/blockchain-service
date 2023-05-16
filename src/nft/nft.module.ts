import { Module } from '@nestjs/common';
import { NftService } from './nft.service';
import { NftController } from './nft.controller';
import Web3 from 'web3';
import * as dotenv from 'dotenv';
import { AbiItem } from 'web3-utils';
import * as fs from 'fs';
import * as path from 'path';
dotenv.config();

@Module({
  controllers: [NftController],
  providers: [NftService, {
    provide: 'CONTRACT',
    useFactory: () => {
      
      const configPath = path.resolve(__dirname, '..', '..', process.env.SMART_CONTRACT_PATH);
      const configFile = fs.readFileSync(configPath, 'utf-8');


      const contractAbi: AbiItem[] = JSON.parse(configFile).abi as AbiItem[];
      const contractAddress: string = process.env.SMART_CONTRACT_ADDRESS;

      const web3 = new Web3(new Web3.providers.HttpProvider(process.env.WEB3_HTTP_PROVIDER_URL));
      const contract = new web3.eth.Contract(contractAbi,contractAddress);
      
      return contract;
    },
  }, {
    provide: 'WEB3',
    useFactory: () => {
      const web3 = new Web3(new Web3.providers.HttpProvider(process.env.WEB3_HTTP_PROVIDER_URL));
      return web3;
    }
  }],
  exports: ['CONTRACT'],
})
export class NftModule {}
