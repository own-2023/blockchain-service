import { Module } from '@nestjs/common';
import { IpfsService } from './ipfs.service';
import { IpfsController } from './ipfs.controller';
import { create } from 'ipfs-http-client'
import * as dotenv from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IpfsEntity } from './entities/ipfs.entity';
import { IpfsRepository } from './repo/ipfs.repository';
import { AuthModule } from 'src/auth/auth.module';
import { jwtConstants } from 'src/constants';
import { NftModule } from 'src/nft/nft.module';
dotenv.config();


@Module({
  imports: [TypeOrmModule.forFeature([IpfsEntity]), AuthModule],
  controllers: [IpfsController],
  providers: [IpfsService, {
    provide: 'IPFS',
    useFactory: () => {
      const ipfs = create({ host: process.env.IPFS_HOST, port: process.env.IPFS_PORT as unknown as number, protocol: process.env.IPFS_PROTOCOL });
      return ipfs;
    },
  }, IpfsRepository],
  exports: [IpfsService],
})
export class IpfsModule { }
