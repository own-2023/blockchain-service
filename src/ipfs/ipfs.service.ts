import { Inject, Injectable } from '@nestjs/common';
import { CreateIpfDto } from './dto/create-ipf.dto';
import { UpdateIpfDto } from './dto/update-ipf.dto';
import { IPFSHTTPClient } from 'ipfs-http-client';
import { IpfsRepository } from './repo/ipfs.repository';


@Injectable()
export class IpfsService {

  constructor(@Inject('IPFS') private readonly ipfs: IPFSHTTPClient,
    private readonly ipfsRepository: IpfsRepository) { }

  create(createIpfDto: CreateIpfDto) {
    return 'This action adds a new ipf';
  }

  findAll() {
    return `This action returns all ipfs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ipf`;
  }

  update(id: number, updateIpfDto: UpdateIpfDto) {
    return `This action updates a #${id} ipf`;
  }

  remove(id: number) {
    return `This action removes a #${id} ipf`;
  }


  async uploadFile(file: Express.Multer.File) {
    const result = await this.ipfs.add(file.buffer);
    const cid = result.cid.toString();
    
  }
}
