import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EthTransactionsModule } from './eth-transactions/eth-transactions.module';
import { IpfsModule } from './ipfs/ipfs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EthTransaction } from './eth-transactions/entities/eth-transaction.entity';
import { NftModule } from './nft/nft.module';

@Module({
  imports: [EthTransactionsModule, IpfsModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',  // macos: localhost, windows: host.docker.internal
    port: 4306,
    username: 'user123',
    password: 'root',
    database: 'db',
    entities: [EthTransaction],
    autoLoadEntities: true,
    synchronize: true,
  }), NftModule],
  controllers: [AppController],
  providers: [
    AppService, 
    ],
})
export class AppModule {}
