import { Module } from '@nestjs/common';
import Web3 from 'web3';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { EthereumController } from './ethereum.controller';
import { EthereumService } from './ethereum.service';
import { EthereumAccountEntity } from './entities/ethereum-account.entity';
import { EthereumAccountRepository } from './repositories/ethereum-account.repository';
import { AuthModule } from 'src/auth/auth.module';
dotenv.config();

@Module({
  imports: [TypeOrmModule.forFeature([EthereumAccountEntity]), AuthModule],
  controllers: [EthereumController],
  providers: [EthereumService, {
    provide: 'WEB3',
    useFactory: () => {
      const web3 = new Web3(new Web3.providers.HttpProvider(process.env.WEB3_HTTP_PROVIDER_URL));
      return web3;
    },
  }, EthereumAccountRepository],
  exports: ['WEB3']
})
export class EthereumModule { }
