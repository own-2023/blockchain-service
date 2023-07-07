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

  getNftViewUrl(cid: string) {
    return `http://127.0.0.1:8080/ipfs/${cid}`;
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

  async getUsersMetadatas(userId: string){
    return await this.ipfsRepository.getUsersMetadatas(userId);
  }
}
