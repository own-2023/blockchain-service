import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EthTransactionsModule } from './eth-transactions/eth-transactions.module';
import { IpfsModule } from './ipfs/ipfs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EthTransaction } from './eth-transactions/entities/eth-transaction.entity';

@Module({
  imports: [EthTransactionsModule, IpfsModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'user123',
    password: 'root',
    database: 'db',
    entities: [EthTransaction],
    autoLoadEntities: true,
    synchronize: true,
  })],
  controllers: [AppController],
  providers: [
    AppService, 
    ],
})
export class AppModule {}
