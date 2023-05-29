import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IpfsModule } from './ipfs/ipfs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NftModule } from './nft/nft.module';
import { AuthModule } from './auth/auth.module';
import { EthereumController } from './ethereum/ethereum.controller';
import { EthereumService } from './ethereum/ethereum.service';
import { EthereumModule } from './ethereum/ethereum.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [IpfsModule, TypeOrmModule.forRoot({
    type: process.env.DB_TYPE as any,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT as any,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    autoLoadEntities: true,
    synchronize: true,
  }), NftModule, AuthModule, EthereumModule],
  controllers: [AppController],
  providers: [
    AppService,
    ],
})
export class AppModule {}
