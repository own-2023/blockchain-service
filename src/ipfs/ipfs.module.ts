import { Module } from '@nestjs/common';
import { IpfsService } from './ipfs.service';
import { IpfsController } from './ipfs.controller';
import { create } from 'ipfs-http-client'
import * as dotenv from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IpfsEntity } from './entities/ipf.entity';
import { IpfsRepository } from './repo/ipfs.repository';
dotenv.config();


@Module({
  imports: [TypeOrmModule.forFeature([IpfsEntity])],
  controllers: [IpfsController],
  providers: [IpfsService, {
    provide: 'IPFS',
    useFactory: () => {
      const ipfs = create({ host: process.env.IPFS_HOST, port: process.env.IPFS_PORT as unknown as number, protocol: process.env.IPFS_PROTOCOL });
      return ipfs;
    },
  },IpfsRepository], 
})
export class IpfsModule {}
