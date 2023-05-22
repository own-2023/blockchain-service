import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EthTransactionsModule } from './eth-transactions/eth-transactions.module';
import { IpfsModule } from './ipfs/ipfs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EthTransaction } from './eth-transactions/entities/eth-transaction.entity';
import { NftModule } from './nft/nft.module';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [EthTransactionsModule, IpfsModule, TypeOrmModule.forRoot({
    type: process.env.DB_TYPE as any,
    host: process.env.DB_HOST,  // macos: localhost, windows: host.docker.internal
    port: process.env.DB_PORT as any,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [EthTransaction],
    autoLoadEntities: true,
    synchronize: true,
  }), NftModule, AuthModule],
  controllers: [AppController],
  providers: [
    AppService, 
    ],
})
export class AppModule {}
