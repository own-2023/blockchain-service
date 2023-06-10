import { Inject, Injectable } from '@nestjs/common';
import { CreateIpfDto } from './dto/create-ipf.dto';
import { UpdateIpfDto } from './dto/update-ipf.dto';
import { IPFSHTTPClient } from 'ipfs-http-client';
import { IpfsRepository } from './repo/ipfs.repository';


@Injectable()
export class IpfsService {

  constructor(@Inject('IPFS') private readonly ipfs: IPFSHTTPClient,
    private readonly ipfsRepository: IpfsRepository) { }

  async uploadFile(file: Express.Multer.File, ownerId: string, nftName: string) {
    const result = await this.ipfs.add(file.buffer);
    const filename = file.originalname;
    const cid = result.cid.toString();
    await this.ipfsRepository.save(ownerId, cid, filename, nftName);
    
  }


  async isIpfsFileExists(cid: string) {
    const result = await this.ipfsRepository.findByCid(cid);
    if(result === null){
      return false;
    }
    else{
      return true;
    }
  }
}
