import { Module } from '@nestjs/common';
import { IpfsService } from './ipfs.service';
import { IpfsController } from './ipfs.controller';
import { create } from 'ipfs-http-client'


@Module({
  controllers: [IpfsController],
  providers: [IpfsService, {
    provide: 'IPFS',
    useFactory: () => {
      const ipfs = create({ host: '127.0.0.1', port: 5001, protocol: 'http' });
      return ipfs;
    },
  },]
})
export class IpfsModule {}
