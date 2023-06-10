import { Module } from '@nestjs/common';
import { NftService } from './nft.service';
import { NftController } from './nft.controller';
import Web3 from 'web3';
import * as dotenv from 'dotenv';
import { AbiItem } from 'web3-utils';
import * as fs from 'fs';
import * as path from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MintedNftEntity } from './entities/minted-nft.entity';
import { NftRepository } from './repo/nft.repository';
import { create } from 'ipfs-http-client'
import { IpfsModule } from 'src/ipfs/ipfs.module';
import { NftEntity } from './entities/nft.entity';
import { AuthModule } from 'src/auth/auth.module';
import { IpfsEntity } from 'src/ipfs/entities/ipfs.entity';
import { EthereumModule } from 'src/ethereum/ethereum.module';

dotenv.config();

@Module({
  imports: [TypeOrmModule.forFeature([ MintedNftEntity, NftEntity, IpfsEntity]), IpfsModule, AuthModule, EthereumModule],
  controllers: [NftController],
  providers: [NftService, {
    provide: 'CONTRACT',
    useFactory: async () => {
      const configPath = path.resolve(__dirname, '..', '..', process.env.SMART_CONTRACT_PATH);
      const configFile = fs.readFileSync(configPath, 'utf-8');
  
      const contractAbi: AbiItem[] = JSON.parse(configFile).abi as AbiItem[];
      const contractBytecode: string = JSON.parse(configFile).bytecode;
      const constructorArguments: any[] = []; // Define the constructor arguments here

      const publicKey = process.env.ACCOUNT_ADDRESS // Replace with the desired public key
      const privateKey = process.env.ACCOUNT_PRIVATE_KEY // Replace with the desired private key

  
      const web3 = new Web3(new Web3.providers.HttpProvider(process.env.WEB3_HTTP_PROVIDER_URL));
      const account = web3.eth.accounts.privateKeyToAccount(privateKey);
      account.address = publicKey;
  
      const deployTransaction = new web3.eth.Contract(contractAbi).deploy({
        data: contractBytecode,
        arguments: constructorArguments,
      });
  
      const gas = await deployTransaction.estimateGas();
      const gasPrice = await web3.eth.getGasPrice();
  
      const signedTransaction = await web3.eth.accounts.signTransaction(
        {
          data: deployTransaction.encodeABI(),
          gas,
          gasPrice,
        },
        account.privateKey
      );
  
      const receipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
      const contractAddress = receipt.contractAddress;
  
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
