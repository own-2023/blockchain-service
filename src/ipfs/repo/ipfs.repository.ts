import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import { IpfsEntity } from '../entities/ipfs.entity';


@Injectable()
export class IpfsRepository {

  constructor(
    @InjectRepository(IpfsEntity) private ipfsRepository: Repository<IpfsEntity>) { }

  save(user_id: string, cid: string, filename: string) {
    this.ipfsRepository.save({ cid, filename, user_id, created_at: new Date() })
  }

}
