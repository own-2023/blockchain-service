import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import { IpfsEntity } from '../entities/ipfs.entity';


@Injectable()
export class IpfsRepository {

  constructor(
    @InjectRepository(IpfsEntity) private ipfsRepository: Repository<IpfsEntity>) { }

  async save(ownerId: string, cid: string, filename: string, nftName: string) {
    const ipfs = new IpfsEntity();
    ipfs.cid = cid;
    ipfs.creator_id =  ownerId;
    ipfs.created_at = new Date();
    ipfs.nft_name = nftName;
    try{await this.ipfsRepository.save(ipfs)}
    catch(err){
      console.error(err);
      throw new InternalServerErrorException();
    }
  }

  async findByCid(cid: string) {
    return await this.ipfsRepository.findOne({ where: { cid } });
  }

}
