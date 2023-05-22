import { Module } from '@nestjs/common';
import { NftService } from './nft.service';
import { NftController } from './nft.controller';
import Web3 from 'web3';
import * as dotenv from 'dotenv';
import { AbiItem } from 'web3-utils';
import * as fs from 'fs';
import * as path from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAccountEntity } from './entities/user-account.entity';
import { UserEntity } from './entities/user.entity';
import { UserNftEntity } from './entities/user-nft.entity';
import { NftRepository } from './repo/nft.repository';
import { create } from 'ipfs-http-client'
import { IpfsService } from 'src/ipfs/ipfs.service';
import { IpfsModule } from 'src/ipfs/ipfs.module';

dotenv.config();

@Module({
  imports: [TypeOrmModule.forFeature([UserAccountEntity, UserEntity, UserNftEntity]), IpfsModule],
  controllers: [NftController],
  providers: [NftService, {
    provide: 'CONTRACT',
    useFactory: () => {

      const configPath = path.resolve(__dirname, '..', '..', process.env.SMART_CONTRACT_PATH);
      const configFile = fs.readFileSync(configPath, 'utf-8');


      const contractAbi: AbiItem[] = JSON.parse(configFile).abi as AbiItem[];
      const contractAddress: string = process.env.SMART_CONTRACT_ADDRESS;

      const web3 = new Web3(new Web3.providers.HttpProvider(process.env.WEB3_HTTP_PROVIDER_URL));
      const contract = new web3.eth.Contract(contractAbi, contractAddress);

      return contract;
    },
  }, {
      provide: 'WEB3',
      useFactory: () => {
        const web3 = new Web3(new Web3.providers.HttpProvider(process.env.WEB3_HTTP_PROVIDER_URL));
        return web3;
      }
    }, {
      provide: 'IPFS',
      useFactory: () => {
        const ipfs = create({ host: process.env.IPFS_HOST, port: process.env.IPFS_PORT as unknown as number, protocol: process.env.IPFS_PROTOCOL });
        return ipfs;
      },
    }
    , NftRepository],
  exports: ['CONTRACT'],
})
export class NftModule { }
