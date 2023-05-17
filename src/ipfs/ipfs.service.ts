import { Inject, Injectable } from '@nestjs/common';
import { CreateIpfDto } from './dto/create-ipf.dto';
import { UpdateIpfDto } from './dto/update-ipf.dto';
import { IPFSHTTPClient } from 'ipfs-http-client';
import { Blob } from "buffer";
import { resourceUsage } from 'process';


@Injectable()
export class IpfsService {

  constructor(@Inject('IPFS') private readonly ipfs: IPFSHTTPClient){}

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

  async add(str: string) {
    const  cid = await this.ipfs.add(str);
    return cid;
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const  result  = await this.ipfs.add(file.buffer);
    console.log(result);
    const cid = result.cid.toString();
    return cid;

  }

}
