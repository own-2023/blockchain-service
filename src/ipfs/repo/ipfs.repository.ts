import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import { IpfsEntity } from '../entities/ipfs.entity';


@Injectable()
export class IpfsRepository {

  constructor(
    @InjectRepository(IpfsEntity) private ipfsRepository: Repository<IpfsEntity>) { }

  async save(ownerId: string, cid: string, filename: string, nftName: string) {
    await this.ipfsRepository.save({ cid, filename, creator_id: ownerId, created_at: new Date(), nft_name: nftName })
  }

  async findByCid(cid: string) {
    return await this.ipfsRepository.findOne({ where: { cid } });
  }

}
